import React from 'react';
import Players from '../assets/players.png'
import Circle from '../assets/circle.png'
import Waves from '../assets/waves.png'
import LoginForm from '../components/LoginForm.jsx'

function LandingPage() {

    const [showSignup, setShowSignup] = React.useState(false);

    const toggleForm = () => {
        setShowSignup(!showSignup);
    }

    return(

        <div className="w-full h-full overflow-hidden bg-dark_gray_bg text-white">
            {/*  actual content  */}
            <div className="flex flex-row w-full h-full">

                {/* left section : image */}
                <div className="bg-light_blue_bg w-full relative ">

                    {/* absolute : logo top left */}
                    <div className="absolute top-9 left-8 ">
                        {/*Field Fusion*/}
                        <div className="flex flex-col gap-5">
                            <div className="text-blue-800 text-6xl font-dancing_script font-bold">Field</div>
                            <div className="text-amber-50 text-8xl font-dancing_script font-bold">Fusion</div>
                        </div>
                    </div>

                    {/* absolute :  circle top center*/}
                    <div className="absolute -top-16 left-1/2 animate-bounce"  style={{ animationDuration: '2.0s' }}>
                        <img src={Circle} alt="circle"/>
                    </div>

                    <div className="absolute -bottom-16 left-[8vw] animate-bounce" style={{ animationDuration: '2.0s' }}>
                        <img src={Circle} alt="circle" className="rotate-180"/>
                    </div>

                    {/* actual content of players*/}
                    <img src={Players} alt="players"/>
                </div>

                {/* right section login/signup  */}
                <div className="bg-dark_blue_bg w-2/4 flex justify-center items-center relative">

                        <div className="absolute top-9 left-0 animate-pulse ">
                            <img src={Waves} alt="waves"/>
                        </div>
                        <div className="flex flex-col gap-y-10 items-center">
                            <div className="font-bold text-3xl">
                                Your Ultimate Booking Handler
                            </div>
                            {/*{showSignup ? <SignupForm /> ? <LoginForm/>}*/}
                            <LoginForm/>
                        </div>

                        <div className="absolute bottom-16 left-[8vw] animate-pulse">
                            <img src={Waves} alt="waves"/>
                        </div>
                </div>

            </div>
        </div>

    )
}

export default LandingPage;