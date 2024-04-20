import axios from "axios";
import toast from "react-hot-toast";
import {Routes, useNavigate} from "react-router-dom";
import Footer from "@/components/Footer.jsx";
import Banner from "@/components/Banner.jsx";
import Card from "@/components/Card.jsx";
import GorillaCage from "../assets/gorilla-cage.jpg"
import PavilionGround from "../assets/pavilion-ground.jpg"
import KickOff from "../assets/kick-off.jpg"
import AvatarDropdown from "@/components/AvatarDropdown.jsx";
import React, {useEffect, useState} from "react";
import CheckoutPage from "@/pages/CheckoutPage.jsx";
import Logo from "@/components/Logo.jsx";
// import Logout from "@/Util/Logout.jsx";

function BookingPage() {

    const navi = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

            const accessToken = localStorage.getItem("accessToken");
            if(!accessToken){
                navi('/')
                toast.error("Unauthorized");
            }
            axios.get('http://localhost:3000/api/v1/users/current-user', {
            headers: { Authorization: `Bearer ${accessToken}` }
            }).then(response => {
                console.log(response.data.data)
                setData(response.data.data);
                setLoading(false);
                // console.log(data)
            }).catch(err=>{
                console.log(err)
                console.log("use effect ke catch block me")
            })


    }, []);

    const logoutHandler = async () => {
        try{
            const accessToken = localStorage.getItem("accessToken");
            console.log(accessToken);
            const Response = await axios.post("http://localhost:3000/api/v1/users/logout", {},
                {
                    "Authorization": `Bearer ${accessToken}`
                });

            console.log(Response)
            if(Response.status === 200){
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                toast.success("Logout successfull")
                navi('/')
            }else{
                console.log("response code is not 200")
            }

        }catch(error){
            toast.error("Logout Unsuccessful")
            console.log("error message is : ",error)
        }
    }

    if (loading) {
        return (<p>Loading...</p>);
    }

    return(
        <div className="relative">

             {/*top right logo*/}
            <div className="absolute top-5 left-5 ">
                <Logo />
            </div>
             {/*top right avatar dropdown*/}
            <div className="absolute top-5 right-5 ">
                <AvatarDropdown name={data.username} />
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


{/*  footer */
}
    <Footer/>
</div>
)

}

export default BookingPage;