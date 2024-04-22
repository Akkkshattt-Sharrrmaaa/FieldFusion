import Logo from "@/components/Logo.jsx";
import Footer from "@/components/Footer.jsx";
import AvatarDropdown from "@/components/AvatarDropdown.jsx";
import {useContext, useState} from "react";
import {userContext} from "@/context/context.js";
import {Carousel} from "@material-tailwind/react";
import img1 from "@/assets/gc/iloveimg-resized/img1.jpeg"
import img3 from "@/assets/gc/iloveimg-resized/img3.jpeg"
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from "react-datepicker";

function CheckoutPage() {

    const value = useContext(userContext)

    const [selectedDate, setSelectedDate] = useState(new Date())

    const getMaxDate = () => {
        const today = new Date()
        return new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
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

                    <div className={"text-black bg-dark_blue_bg"}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date)=> setSelectedDate(date)}
                            minDate={new Date()}
                            maxDate={getMaxDate()}
                            dateFormat="dd/MM/yyyy"
                            showDisabledMonthNavigation
                        />
                    </div>


                </div>

            </div>

            <Footer />

        </div>
    )

}

export default CheckoutPage;