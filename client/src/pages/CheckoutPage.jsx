import Logo from "@/components/Logo.jsx";
import Footer from "@/components/Footer.jsx";
import AvatarDropdown from "@/components/AvatarDropdown.jsx";
import {useContext, useState} from "react";
import {userContext} from "@/context/context.js";
import {Carousel, Spinner} from "@material-tailwind/react";
import img1 from "@/assets/gc/iloveimg-resized/img1.jpeg"
import img3 from "@/assets/gc/iloveimg-resized/img3.jpeg"
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import axios from "axios";
import {json, useNavigate} from "react-router-dom";

function CheckoutPage() {

    const value = useContext(userContext)
    const accessToken = value.user.data.accessToken;
    const navi = useNavigate()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [fetchingSlots , setFetchingSlots ] = useState(false);
    const [availableSlots, setAvailableSlots ] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const getMaxDate = () => {
        const today = new Date()
        return new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    }

    const fetchAvailableSlots = async () => {
        try {
            const formattedDate = selectedDate.toISOString().split('T')[0]
            console.log("formattedDate : ", formattedDate)
            setFetchingSlots(true)
            const res = await axios.post("http://localhost:3000/api/v1/slots/get-available-slots", {
                "date" : formattedDate
            })
            console.log(res.data.data)
            setAvailableSlots(res.data.data)
            toast.success("Available slots fetched successfully")
            setFetchingSlots(false)

        }catch(error){
            console.log(error)
            toast.error("Failed to fetch available slots")
        }
    }

    const handleBooking = async () => {
        try{
            if( !selectedSlot ){
                toast.error("Please choose a slot")
            }else{

                const objectData = JSON.parse(selectedSlot);

                console.log("date", objectData.date)
                console.log("startTime", objectData.startTime)
                console.log("endTime", objectData.endTime)
                console.log("status", "not-booked")
                const res = await axios.post("http://localhost:3000/api/v1/slots/book-slot", {
                    "date": objectData.date,
                    "startTime": objectData.startTime,
                    "endTime": objectData.endTime,
                    "status": "not-booked",
                }, {
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                console.log(res)
                if(res.status === 200){
                    toast.success("Booking successful")
                    toast.success("Conformation mail sent on your email")
                    toast.success("Redirecting you to the booking history")

                    setTimeout(()=>{
                        navi('/profile/bookinghistory')
                    },4000)
                }

            }

        }catch(error){
            console.log(error)
            toast.error("booking unsuccessful")
            toast.error("please try again later")
        }
    }

    const slides = [
        img1,
        img3
    ]

    return(
        <div
            className="relative w-full h-full"
        >
            {/* left logo */}
            <div
                className="absolute top-5 left-5"
            >
                <Logo />
            </div>

            <div className="absolute top-5 right-5 ">
                <AvatarDropdown name = {value.user.data.user.username} />
            </div>

            {/* main content */}
            <div className={"py-28 flex justify-around"}>

                {/* left*/}
                <div className={"flex flex-col gap-4"}>

                    <div>
                        <div className={"font-mulish text-gray-700 font-extrabold text-3xl"}> Gorilla Cage</div>
                        <div className={"font-mulish text-gray-500 font-bold text-2xl"}> Near UPES, Bidholi, Dehradun</div>
                    </div>

                    <div className="max-w-lg">
                        <Carousel>
                            {slides.map((slide, index) => (
                                <img src={slide} alt={index} key={index} />
                            ))}
                        </Carousel>
                    </div>
                </div>

                {/*right*/}
                <div>
                    <div>
                        Book Your Slot
                    </div>

                    <div className={"text-black flex flex-col gap-3"}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date)=> setSelectedDate(date)}
                            minDate={new Date()}
                            maxDate={getMaxDate()}
                            dateFormat="yyyy-MM-dd"
                            showDisabledMonthNavigation
                        />

                        { fetchingSlots ? <Spinner /> :
                            <button onClick={fetchAvailableSlots}>Fetch Available Slots</button>
                        }
                    </div>

                    <div>
                        {availableSlots.length > 0 ?
                            <div>
                                <label htmlFor="">Select a slot</label>
                                <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} >
                                    <option value={null}>--choose a slot--</option>
                                    {
                                        availableSlots.map((slot, index) => (
                                            <option key={index} value={JSON.stringify(slot)} > {slot.startTime}:00 - {slot.endTime}:00</option>
                                        ))
                                    }
                                </select>

                                <button onClick={handleBooking} >Book Now</button>
                            </div>
                            :
                            <div>
                                No slots available yet.
                            </div>
                        }
                    </div>


                </div>

            </div>

            <Footer />

        </div>
    )

}

export default CheckoutPage;