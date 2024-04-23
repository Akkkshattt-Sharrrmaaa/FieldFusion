import Logo from "@/components/Logo.jsx";
import Footer from "@/components/Footer.jsx";
import AvatarDropdown from "@/components/AvatarDropdown.jsx";
import {useContext, useState} from "react";
import {userContext} from "@/context/context.js";
import { Spinner} from "@material-tailwind/react";
import img1 from "@/assets/gc/iloveimg-resized/img1.jpeg"
import img3 from "@/assets/gc/iloveimg-resized/img3.jpeg"
import img2 from "@/assets/gc/iloveimg-resized/img2.jpeg"
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import Carousel from "@/components/Carousel.jsx"

function CheckoutPage() {

    const value = useContext(userContext)
    const accessToken = value.user.data.accessToken;
    const navi = useNavigate()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [slotsFetched , setSlotsFetched ] = useState(false);
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
            const res = await axios.post("http://localhost:3000/api/v1/slots/get-available-slots", {
                "date" : formattedDate
            })
            console.log(res.data.data)
            setAvailableSlots(res.data.data)
            toast.success("Available slots fetched successfully")
            setSlotsFetched(true)
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

                    const resp  = await axios.post("http://localhost:3000/api/v1/slots/mail",{
                        "mailId" : value.user.data.user.email,
                        "startTime" : objectData.startTime,
                        "endTime" : objectData.endTime,
                        "date": objectData.date,
                    })
                    toast.success("Booking successful")
                    toast.success("Conformation mail sent on your email", { duration: 3000 })
                    toast.success("Redirecting you to the booking history", { duration: 3000 })

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
        img2,
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
            <div className={"py-28 flex  max-w-[60%] mx-auto"}>

                {/* left*/}
                <div className={"flex flex-col w-[70%] gap-3 items-center "}>

                    <div>
                        <div className={"font-mulish text-blue-800 font-extrabold text-3xl"}> Gorilla Cage</div>
                        <div className={"font-mulish text-blue-500 font-bold text-2xl"}> Near UPES, Bidholi, Dehradun
                        </div>
                    </div>

                    <div className="w-[60%] py-3 px-3 bg-gray-100 rounded-lg shadow-2xl shadow-blue-400 hover:scale-105 transition duration-200 ease-in-out">
                        <Carousel slides={slides}/>
                    </div>
                </div>

                {/*right*/}
                <div className={"pt-20"}>
                    <div className={"font-mulish text-gray-700 font-extrabold text-3xl pb-10"}>
                        Book Your Slot
                    </div>

                    <div className={"text-black flex flex-col gap-5"}>
                        <div>
                            <div className={"pb-2"}>
                                Pick a date :
                            </div>


                            <DatePicker
                            selected={selectedDate}
                            onChange={(date)=> (setSelectedDate(date), setSlotsFetched(false)) }
                            minDate={new Date()}
                            maxDate={getMaxDate()}
                            dateFormat="yyyy-MM-dd"
                            showDisabledMonthNavigation
                            className = "bg-gray-200 w-full  py-1 px-2 rounded-lg hover:scale-105 transition duration-200 ease-in-out hover:shadow-xl hover:shadow-blue-400"
                        />
                        </div>


                            <div>
                                {!slotsFetched ?
                                    <button onClick={fetchAvailableSlots}
                                            className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-800 sm:w-auto">Check
                                        Available Slots</button> :
                                    <div>
                                        {availableSlots.length > 0 ?
                                            <div className={"flex flex-col gap-2"}>
                                                <label htmlFor="">Select a slot :</label>
                                                <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}
                                                       className = "bg-gray-200 w-full h-[4vh] rounded-lg hover:scale-105 transition duration-200 ease-in-out hover:shadow-xl hover:shadow-blue-400"
                                                >
                                                    <option value={null} >--choose a slot--</option>
                                                    {
                                                        availableSlots.map((slot, index) => (
                                                            <option key={index} value={JSON.stringify(slot)} > {slot.startTime}:00 - {slot.endTime}:00</option>
                                                        ))
                                                    }
                                                </select>

                                                <button onClick={handleBooking}
                                                    className="block w-full rounded bg-blue-600 mt-4 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-800 sm:w-auto"
                                                >Book Now</button>
                                            </div>
                                            :
                                            <div>
                                                No slots available yet.
                                            </div>
                                        }
                                    </div>
                                }
                            </div>


                    </div>

                    <div>

                    </div>


                </div>

            </div>

            <Footer />

        </div>
    )

}

export default CheckoutPage;