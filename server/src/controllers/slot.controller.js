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

const bookSlot = asyncHandler(async(req, res) => {
    const {date, startTime, endTime, status} = req.body;
    if([date, startTime, endTime, status].some(field => field.trim()==="")){
        throw new ApiError(400, "All the fields are required!!");
    }

    const {startTimeAdjusted, endTimeAdjusted} = convertStringToHours(startTime, endTime);

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

const getAllSlots = asyncHandler(async(req, res) => {
    
})

export {
    bookSlot
}