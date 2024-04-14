import './App.css'
import React from 'react'
import {Routes, Route} from "react-router-dom";
import LandingPage from "@/pages/LandingPage.jsx";
import BookingPage from "@/pages/BookingPage.jsx";
import {Toaster} from "react-hot-toast";

function App() {

    return (
        <div className="w-[100vw] h-[100vh]">
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/booking" element={<BookingPage/>} />
            </Routes>

            <Toaster/>
        </div>

)
}

export default App
