import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {userContext} from "@/context/context.js";
import toast from "react-hot-toast";
import Footer from "@/components/Footer.jsx";
import Logo from "@/components/Logo.jsx";
import AvatarDropdown from "@/components/AvatarDropdown.jsx";
import {useNavigate} from "react-router-dom";


function BookingHistory(){

    const [history, setHistory] = useState([]);
    const value = useContext(userContext)
    const navi = useNavigate()
    // const [api, setApi] = useState("http://localhost:3000/api/v1/users/booking-history")

    const moveToBooking = () => {
        navi("/booking")
    }

    useEffect(() => {

        // const userType = value.user.data.user.role
        //         if(userType == "admin"){
        //             setApi("http://localhost:3000/api/v1/slots/get-all-slots")
        //         }
        const fetchBookingHistory = async () => {
            try{

                if( value.user.data.user.role == "admin"){
                    const accessToken = value.user.data.accessToken || localStorage.getItem("accessToken");
                    const res = await  axios.get("http://localhost:3000/api/v1/slots/get-all-slots", {
                    headers:{
                      Authorization: `Bearer ${accessToken}`
                    }
                    });
                    toast.success("Booking history fetched successfully")
                    console.log("Booking history is ", res.data.data)
                    setHistory(res.data.data)
                }else{
                    const accessToken = value.user.data.accessToken || localStorage.getItem("accessToken");
                    const res = await  axios.get("http://localhost:3000/api/v1/users/booking-history", {
                    headers:{
                      Authorization: `Bearer ${accessToken}`
                    }
                    });
                    toast.success("Booking history fetched successfully")
                    console.log("Booking history is ", res.data.data)
                    setHistory(res.data.data)
                }

               // const accessToken = value.user.data.accessToken || localStorage.getItem("accessToken");
               // const res = await  axios.get(api, {
               //    headers:{
               //        Authorization: `Bearer ${accessToken}`
               //    }
               // });
               // toast.success("Booking history fetched successfully")
               // console.log("Booking history is ", res.data.data)
               //  setHistory(res.data.data)
           }
           catch (error){
                toast.error("Failed to fetch booking history")
           }
        }

        fetchBookingHistory()
    }, []);

    return(

        <div>

            {/*top nav*/}
            <div className={"flex justify-between px-5 py-5"}>
                <Logo />
                <AvatarDropdown name = {value.user.data.user.username} />
            </div>

            <div className={"mx-auto text-center"}>
                <h1 className="text-3xl font-extrabold sm:text-5xl pt-10">
                    <strong className="font-extrabold text-blue-800 sm:block"> Booking History </strong>
                </h1>
            </div>


            <div className={"min-h-[40vh] flex justify-center items-center py-16 "}>
                { history.length > 0 ?
                    <div className="mt-4 hover:shadow-2xl hover:shadow-blue-400 hover:scale-105 transition duration-300 ease-in-out">
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Booking Id
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Created At
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Start Time
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    End Time
                                                </th>
                                                <div>
                                                   {
                                                    value.user.data.user.role === "admin" &&
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Owner
                                                    </th>
                                                }
                                                </div>


                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                Status
                                                </th>
                                                {/*<th scope="col" className="relative px-6 py-3">*/}
                                                {/*    <span className="sr-only">Edit</span>*/}
                                                {/*</th>*/}
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {history.map(booking => (
                                                <tr key={booking._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {booking._id}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {booking.createdAt}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {booking.date}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {booking.startTime}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {booking.endTime}
                                                    </td>
                                                    <div>
                                                       {
                                                    value.user.data.user.role === "admin" &&
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {booking.owner.email}
                                                        </td>
                                                    }
                                                    </div>

                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                          <span
                                                              className="px-2 inline-flex text-xs leading-5
                                                          font-semibold rounded-full bg-green-100 text-green-800"
                                                          >
                                                            {booking.status}
                                                          </span>
                                                    </td>
                                                    {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">*/}
                                                    {/*    {person.role}*/}
                                                    {/*</td>*/}
                                                    {/*<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">*/}
                                                    {/*    <a href="#" className="text-indigo-600 hover:text-indigo-900">*/}
                                                    {/*        Edit*/}
                                                    {/*    </a>*/}
                                                    {/*</td>*/}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :

                    <div className={"flex flex-col items-center"}>
                        <div className={"text-3xl font-bold"}>
                            Looks Empty ?
                        </div>
                        <div className={"text-2xl font-bold text-blue-800"}>
                            Coz you've not made any bookings yet
                        </div>
                        <div><span onClick={moveToBooking} className={"underline text-light_blue_bg cursor-pointer"}>Click here</span> to make
                            one now!
                        </div>
                    </div>}
            </div>


            <Footer/>
        </div>

    )
}

export default BookingHistory;