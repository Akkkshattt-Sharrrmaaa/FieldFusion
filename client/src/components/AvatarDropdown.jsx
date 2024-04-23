import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {userContext} from "@/context/context.js";
import axios from "axios";
import toast from "react-hot-toast";

function AvatarDropdown(props) {

    const navi = useNavigate()
    const value = useContext(userContext)
    const [isOpen, setIsOpen] = React.useState(false);

    function handleToggle() {
        setIsOpen(!isOpen)
    }

    function moveToProfile() {
        navi('/profile')
    }


    function moveToBookingHistory() {
        navi('/profile/bookinghistory')
    }

    function moveToHome(){
        navi('/booking')
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
        <div className="relative">
            <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                <a
                    href="#"
                    className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                >
                    {props.name}
                </a>

                <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                        onClick={()=> handleToggle()}
                >
                    <span className="sr-only">Menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={`${isOpen ? 'visible' : 'hidden'} absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg`}
                role="menu"
            >
                <div className="p-2">

                    <button
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                        onClick={moveToHome}
                    >
                        Home
                    </button>

                    <button
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                        onClick={moveToProfile}
                    >
                        Profile
                    </button>

                    <button
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                        onClick={moveToBookingHistory}
                    >
                        Booking History
                    </button>

                </div>

                <div className="p-2">
                    <button
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                        onClick={logoutHandler}
                    >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>

                            Logout
                        </button>
                </div>
            </div>
        </div>
    )
}

export default AvatarDropdown;