import Logo from "@/components/Logo.jsx";
import AvatarDropdown from "@/components/AvatarDropdown.jsx";
import React, {useContext} from "react";
import Footer from "@/components/Footer.jsx";
import {userContext} from "@/context/context.js";
import DevCard from "@/components/DevCard.jsx";
import akshat from "@/assets/team/akshat.jpg"
import abhishek from "@/assets/team/abhishek.jpg"
import om from "@/assets/team/om.jpg"

function About() {

    const value = useContext(userContext)

    return(
        <div>
            {/*top nav*/}
            <div className={"flex justify-between px-5 py-5"}>
                <Logo/>
                <AvatarDropdown name={value.user.data.user.username}/>
            </div>

            <div className={"mx-auto text-center"}>
                <h1 className="text-3xl font-extrabold sm:text-5xl pt-10">
                    <strong className="font-extrabold text-blue-800 sm:block"> Know The Team </strong>
                </h1>
            </div>

            <div className="flex flex-wrap gap-y-10 gap-x-10 justify-center items-center py-20 px-12">

                <div
                    className=" w-[28vw] hover:shadow-2xl hover:scale-105 transition duration-200 ease-in-out hover:shadow-blue-400 hover:cursor-pointer rounded-lg"
                >
                    <DevCard
                        title ={"Front End Developer"}
                        name = {"Akshat Sharma"}
                        content = {"Frontend wizard conjuring captivating and seamless user experiences through deft wielding of React's powerful capabilities, combined with Tailwind CSS's utility-first styling prowess."}
                        image = {akshat}
                        linkedin={"https://www.linkedin.com/in/akkkshattt-sharrrmaaa/"}
                        github={"https://github.com/Akkkshattt-Sharrrmaaa"}
                    />
                </div>

                <div
                    className=" w-[28vw] hover:scale-105 transition duration-200 ease-in-out hover:shadow-2xl hover:shadow-blue-400 hover:cursor-not-allowed rounded-lg"
                >
                    <DevCard
                        title ={"Back End Developer"}
                        name = {"Abhishek Chauhan"}
                        image = {abhishek}
                        content = {"Seasoned backend artisan, forging robust and scalable server-side solutions with Node.js and Express  ensuring optimal performance and data integrity."}
                        github={"https://github.com/Abhishek85805"}
                        linkedin={"https://www.linkedin.com/in/abhishek-chauhan-b0801622a"}
                    />
                </div>


                <div
                    className="w-[28vw] hover:shadow-2xl hover:scale-105 transition duration-200 ease-in-out hover:shadow-blue-400 hover:cursor-not-allowed rounded-lg"
                >
                    <DevCard
                        title ={"UI/UX Developer / Tester"}
                        name = {"Om Mittal"}
                        image = {om}
                        content = {"UI/UX visionary crafting intuitive and delightful user experiences through meticulous design thinking, seamlessly bridging aesthetics with functionality to elevate digital products."}
                        linkedin={"https://www.linkedin.com/in/om-mittal-4a164b22b"}
                        github={"https://github.com/OMRAKESHMITTAL"}
                    />
                </div>


            </div>


            <Footer/>
        </div>
    )
}

export default About;