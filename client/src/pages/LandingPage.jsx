import React from 'react';
import Fballers from '../assets/fballers.png'
import LoginForm from "@/components/LoginForm.jsx";
import SignupForm from "@/components/SignupForm.jsx";

function LandingPage() {

    // true => Login From , false => Signup Form
    const [formType, setFormType] = React.useState(false)

    function toggleForm(){
        setFormType(!formType)
    }
    return(

        <div
            className="relativetive h-screen w-screen bg-contain bg-no-repeat  "
            style={{
                backgroundImage: `url(${Fballers})`,
            }}
        >
            {/* logo*/}
            <div
                className={"absolute right-5 top-5"}
            >
                <div className="flex flex-col items-end pr-10 py-5 animate-pulse">
                    <div className="text-blue-800 text-5xl font-dancing_script  font-extrabold">Field</div>
                    <div className="text-blue-500 text-6xl font-dancing_script font-extrabold">Fusion</div>
                </div>
            </div>

           {/* circle*/}


           {/*  form*/}
           <div className={"absolute bottom-12 right-12 shadow-cyan-700/50 shadow-xl opacity-90 hover:opacity-100 hover:scale-105 transition duration-200 ease-in-out"}>
              {formType? <LoginForm toggleForm={toggleForm} /> : <SignupForm toggleForm={toggleForm} />}
           </div>
        </div>

    // <div className="w-full h-full overflow-hidden bg-dark_gray_bg text-white">
    //     {/*  actual content  */}
    //     <div className="flex flex-row w-full h-full">
    //
    //         {/* left section : image */}
    //         <div className="bg-light_blue_bg h-full w-full relative bg-cover bg-center "
    //              style={{
    //                  backgroundImage : `url(${Footballers})`,
    //              }}
    //         >
    //
    //             {/* absolute : logo top left */}
    //             <div className="absolute top-9 left-8 ">
    //                 {/*Field Fusion*/}
    //                 <div className="flex flex-col gap-5">
    //                     <div className="text-blue-800 text-6xl font-dancing_script font-bold">Field</div>
    //                     <div className="text-amber-50 text-8xl font-dancing_script font-bold">Fusion</div>
        //                 </div>
        //             </div>
        //
        //             {/* absolute :  circle top center*/}
        //             <div className="absolute -top-16 left-1/2 animate-bounce"  style={{ animationDuration: '2.0s' }}>
        //                 <img src={Circle} alt="circle"/>
        //             </div>
        //
        //             <div className="absolute -bottom-16 left-[8vw] animate-bounce" style={{ animationDuration: '2.0s' }}>
        //                 <img src={Circle} alt="circle" className="rotate-180"/>
        //             </div>
        //
        //             {/* actual content of players*/}
        //             {/*<img src={Footballers} height={140} alt="players"/>*/}
        //         </div>
        //
        //         {/* right section login/signup  */}
        //         <div className="bg-dark_blue_bg w-2/4 flex justify-center items-center relative">
        //
        //                 <div className="absolute top-9 left-0 animate-pulse ">
        //                     <img src={Waves} alt="waves"/>
        //                 </div>
        //
        //                 <div className="flex flex-col gap-y-10 items-center">
        //                     <div className="w-full font-extrabold text-5xl text-center">
        //                         Your Ultimate Booking Handler
        //                     </div>
        //
        //                     {/*<Form/>*/}
        //                     {formType? <LoginForm toggleForm={toggleForm} /> : <SignupForm toggleForm={toggleForm} />}
        //
        //                 </div>
        //
        //                 <div className="absolute bottom-8 left-[8vw] animate-pulse">
        //                     <img src={Waves} alt="waves"/>
        //                 </div>
        //         </div>
        //
        //     </div>
        // </div>

    )
}

export default LandingPage;