import toast from "react-hot-toast";
import Footer from "@/components/Footer.jsx";
import Banner from "@/components/Banner.jsx";
import Card from "@/components/Card.jsx";
import GorillaCage from "../assets/gorilla-cage.jpg"
import PavilionGround from "../assets/pavilion-ground.jpg"
import KickOff from "../assets/kick-off.jpg"
import Logo from "@/components/Logo.jsx";
import AvatarDropdown from "@/components/AvatarDropdown.jsx";
import {userContext} from "@/context/context.js";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";


function BookingPage() {

    const navi = useNavigate()
    const value =  useContext(userContext)

    return(
        <div className="relative">

             {/*top left logo*/}
            <div className="absolute top-5 left-5 ">
                <Logo />
            </div>
             {/*top right avatar dropdown*/}
            <div className="absolute top-5 right-5 ">
                <AvatarDropdown name = {value.user.data.user.username} />
            </div>

            {/* hero / banner */}
            <div className="">
                <Banner/>
            </div>

            {/* show playgrounds */}
            <div className="flex flex-col items-center py-10" id="cardSection">

                <div>
                    <h1>
                        <strong className="text-blue-800 sm:block text-3xl font-extrabold sm:text-5xl"> Available
                            Turfs </strong>
                    </h1>
                </div>

                {/* cards */}
                    <div className="flex gap-y-10 gap-x-10 justify-center items-center py-20">

                        <div className="hover:shadow-2xl hover:shadow-blue-400 hover:cursor-pointer"
                             onClick={()=> navi('/checkout')}
                        >
                            <Card img={GorillaCage}
                                  title="Gorilla Cage, Bidholi,Dehradun"
                                  price="₹1100 / hour"
                                  parking="Available"
                                  bathrooms="Available"
                                  lighting="Available"
                            />
                        </div>

                        <div className="hover:shadow-2xl hover:shadow-blue-400 hover:cursor-not-allowed"
                             onClick={() => {
                                 toast.error("Online booking currently unavailable for 'Pavilion Ground' ")
                             }}
                        >
                            <Card img={PavilionGround}
                                  title="Pavilion Ground, Chukkuwala, Dehradun"
                                  price="₹1500 / hour"
                                  parking="Unavailable"
                                  bathrooms="Available"
                                  lighting="Unavailable"
                            />
                        </div>


                        <div className="hover:shadow-2xl hover:shadow-blue-400 hover:cursor-not-allowed"
                             onClick={() => {
                                 toast.error("Online booking currently unavailable for 'Kick Off' ")
                             }}
                        >
                            <Card img={KickOff}
                                  title="Kick Off, Mothrowala, Dehradun"
                                  price="₹800 / hour"
                                  parking="Unavailable"
                                  bathrooms="Available"
                                  lighting="Available"
                            />
                        </div>


                    </div>
            </div>


            {/*  footer */}
            <Footer/>
        </div>
)

}

export default BookingPage;