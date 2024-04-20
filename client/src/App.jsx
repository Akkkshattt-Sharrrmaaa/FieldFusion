import './App.css'
import React from 'react'
import {Routes, Route} from "react-router-dom";
import LandingPage from "@/pages/LandingPage.jsx";
import BookingPage from "@/pages/BookingPage.jsx";
import {Toaster} from "react-hot-toast";
import CheckoutPage from "@/pages/CheckoutPage.jsx";

function App() {

    return (
        <div className="w-[100vw] h-[100vh]">

            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/booking" element={<BookingPage/>} />
                <Route path="/checkout" element={<CheckoutPage/>} />
            </Routes>

            <Toaster/>
        </div>

)
}

export default App
