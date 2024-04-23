import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {userContext} from "@/context/context.js";
import axios from "axios";

function Banner(){

    const navi = useNavigate()
    const value = useContext(userContext)

    function moveToCheckout(){
        navi('/checkout')
    }


    async function logoutHandler(){
        try{
            const accessToken = value.user.data.accessToken;
            console.log("Access token is , ", accessToken);
            const res = await axios.post("http://localhost:3000/api/v1/users/logout", {}, {
                headers:{
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            console.log(res)
            if(res.status === 200){
                toast.success("Logout successfull")
                value.setUser({})
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                navi('/')
            }else{
                toast.error(res.status)
            }

        }catch(error){
            toast.error("Logout failed")
        }
    }

    return (
        <section className="bg-gray-50">
            <div className="mx-auto  max-w-screen-xl px-4 py-20 lg:flex  lg:items-center">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Optimize Your Play Experience
                        <strong className="font-extrabold text-blue-800 sm:block"> Boost Engagement. </strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Explore a world of possibilities with our intuitive platform designed for seamless play scheduling and management!
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-500 focus:outline-none focus:ring active:bg-blue-800 sm:w-auto"
                            onClick={moveToCheckout}
                        >
                            Book Now
                        </button>

                        <button
                            className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                            onClick={logoutHandler}

                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;