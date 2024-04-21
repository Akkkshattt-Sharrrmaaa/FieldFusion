import './App.css'
import React, {useState} from 'react'
import {Routes, Route} from "react-router-dom";
import LandingPage from "@/pages/LandingPage.jsx";
import BookingPage from "@/pages/BookingPage.jsx";
import {Toaster} from "react-hot-toast";
import CheckoutPage from "@/pages/CheckoutPage.jsx";
import {userContext} from "@/context/context.js";

function App() {

    const [user, setUser] = useState({username : "Username"});

    return (
        <>
            <userContext.Provider value={{user, setUser}}>
                <div className="w-screen h-screen">

                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/booking" element={<BookingPage/>}/>
                        <Route path="/checkout" element={<CheckoutPage/>}/>
                    </Routes>

                    <Toaster/>
                </div>
            </userContext.Provider>
        </>
    )
}

export default App
