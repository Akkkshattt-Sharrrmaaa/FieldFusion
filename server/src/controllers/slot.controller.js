import moment from 'moment';
import nodemailer from 'nodemailer'
import { User } from "../models/user.model.js";
import { Slot } from "../models/slot.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const convertStringToHours = (startTime, endTime) => {
    let startTimeAdjusted = parseInt(startTime.slice(0, -2));
    const startTimeMeridiem = startTime.slice(-2);
    let endTimeAdjusted = parseInt(endTime.slice(0, -2));
    const endTimeMeridiem = endTime.slice(-2);

    if (startTimeMeridiem === 'PM' && startTimeAdjusted !== 12) {
        startTimeAdjusted += 12;
    }
    if (endTimeMeridiem === 'PM' && endTimeAdjusted !== 12) {
        endTimeAdjusted += 12;
    }

    return {startTimeAdjusted, endTimeAdjusted};
}

const convertToAmPm = (time) => {
    if (time < 12) {
        return time + "AM";
    } else if (time === 12) {
        return time + "PM";
    } else {
        return (time - 12) + "PM";
    }
}

const createSlotsForDay = (date) => {
    const startTime = moment(`${date}T05:00:00`);
    const endTime = moment(`${date}T23:00:00`);

    const interval = 1;
    const slots = [];

    while (startTime.isBefore(endTime)) {
        const slot = {
            date: startTime.format('YYYY-MM-DD'),
            startTime: startTime.hour(),
            endTime: startTime.add(interval, 'hours').hour(),
            status: 'available',
        };
        slots.push(slot);
    }

    return slots;
}

const bookSlot = asyncHandler(async(req, res) => {
    const {date, startTime, endTime, status} = req.body;
    if([date, startTime, endTime, status].some(field => field.trim()==="")){
        throw new ApiError(400, "All the fields are required!!");
    }

    const {startTimeAdjusted, endTimeAdjusted} = convertStringToHours(startTime, endTime);
    console.log(startTimeAdjusted, endTimeAdjusted);

    const existingSlots = await Slot.find({
        $or: [
            { $and: [{ date: date }, { startTime: { $lt: endTimeAdjusted } }, { endTime: { $gt: startTimeAdjusted} }] }, // New slot starts before existing slot ends and ends after existing slot starts
            { $and: [{ date: date }, { startTime: { $gte: startTimeAdjusted } }, { endTime: { $lte: endTimeAdjusted } }] } // Existing slot is completely within the new slot's timing
        ]
    });

    if(existingSlots.length > 0){
        throw new ApiError(409, "Slot is already booked");
    }

    const slot = await Slot.create({
        date,
        startTime : startTimeAdjusted,
        endTime : endTimeAdjusted,
        status : "booked",
        owner: req.user._id
    });
    if(!slot){
        throw new ApiError(500, "Something went wrong while booking for slot");
    }

    const user = await User.findById(req.user._id);
    user.bookingHistory.push(slot?._id);
    user.save({validateBeforeSave: true});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            slot,
            "Slot booked successfully"
        )
    )
});

const getAllSlots = asyncHandler(async (req, res) => {
    try {
        const bookedSlots = await Slot.find({ status: 'booked' })
            .populate('owner', 'name email') // Populate the owner field with name and email
            .sort({ createdAt: -1 }); // Sort by creation date in descending order

        if (!bookedSlots || bookedSlots.length === 0) {
            return res.status(200).json(new ApiResponse(200, [], 'No booked slots found'));
        }

        // Convert startTime and endTime to AM/PM format
        const formattedSlots = bookedSlots.map(slot => {
            const startTimeFormatted = convertToAmPm(slot.startTime);
            const endTimeFormatted = convertToAmPm(slot.endTime);
            return {
                ...slot.toObject(),
                startTime: startTimeFormatted,
                endTime: endTimeFormatted,
            };
        });

        return res.status(200).json(new ApiResponse(200, formattedSlots, 'Booked slots fetched successfully'));
    } catch (error) {
        throw new ApiError(500, 'Something went wrong while fetching booked slots');
    }
});

const getAvailableSlots = asyncHandler(async (req, res) => {
    const { date } = req.body;
    if (!date) throw new ApiError(400, "Date is required");

    const currentDate = new Date();
    const providedDate = new Date(date);

    const isToday = currentDate.toDateString() === providedDate.toDateString();

    let allSlots;

    if (isToday) {
        const currentTime = currentDate.getHours();
        console.log(currentTime);
        const bookedSlots = await Slot.find({ date: date });

        allSlots = createSlotsForDay(date).filter(slot => {
            for (const bookedSlot of bookedSlots) {
                if (
                    slot.date === bookedSlot.date &&
                    slot.startTime >= bookedSlot.startTime &&
                    slot.endTime <= bookedSlot.endTime
                ) {
                    return false;
                }
            }
            return slot.startTime > currentTime;
        });
    } else {
        const bookedSlots = await Slot.find({ date: date });

        allSlots = createSlotsForDay(date).filter(slot => {
            for (const bookedSlot of bookedSlots) {
                if (
                    slot.date === bookedSlot.date &&
                    slot.startTime >= bookedSlot.startTime &&
                    slot.endTime <= bookedSlot.endTime
                ) {
                    return false;
                }
            }
            return true;
        });
    }

    allSlots.forEach(slot => {
        slot.startTime = convertToAmPm(slot.startTime);
        slot.endTime = convertToAmPm(slot.endTime);
    });

    return res.status(200).json(new ApiResponse(
        200,
        allSlots,
        "Available Slots fetched successfully"
    ));
});

const mail = asyncHandler(async(req, res) => {
    const {mailId, startTime, endTime, date} = req.body;
    const {startTimeAdjusted, endTimeAdjusted} = convertStringToHours(startTime, endTime);

    if([date, startTime, endTime].some(field => field.trim()==="")){
        throw new ApiError(400, "All the fields are required!!");
    }

    if(!mailId) throw new ApiError(400, "Mail Id is required");

    const slot = await Slot.find({
        $and: [
            { date: date },
            { startTime: { $eq: startTimeAdjusted } },
            { endTime: { $eq: endTimeAdjusted } }
        ]
    })

    if(!slot) throw new ApiError(404, "Slot is not booked");


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_ID_PASS
        },
    });

    const info = await transporter.sendMail({
        from: process.env.MAIL_ID,
        to: mailId,
        subject: "Slot Booking Confirmation",
        text: `Thank you for booking a slot. Your booking details are as follow:
Date: ${date},
Start Time: ${startTime},
End Time: ${endTime}
                
We are looking forward to see you soon.`

    });

    return res.status(200).json({
        status: "success",
        data: info,
        message: "Email sent successfully"
    });
});

export {
    bookSlot,
    getAvailableSlots,
    mail,
    getAllSlots,
}