import Logo from "@/components/Logo.jsx";
import AvatarDropdown from "@/components/AvatarDropdown.jsx";
import {useContext} from "react";
import {userContext} from "@/context/context.js";
import Footer from "@/components/Footer.jsx";



function Profile() {
    const value = useContext(userContext)
    return(
       <div>

           {/*top nav*/}
           <div className={"flex justify-between px-5 py-5"}>
               <Logo />
               <AvatarDropdown name={value.user.data.user.username}  />
           </div>

           {/* content area*/}
           <div className={"flex items-center gap-12 max-w-[65vw] mx-auto py-10 "}>

               {/* left section*/}
               <div className={"flex flex-col items-center gap-2"}>
                  <div className={"rounded-full border shadow-2xl shadow-blue-400 animate-pulse scale-90"} >
                      <img src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${value.user.data.user.username}`} width={350} />
                  </div>
                  <h1
                      className={"text-3xl font-extrabold sm:text-5xl "}>
                      <strong className="font-extrabold text-blue-800 sm:block">
                          {value.user.data.user.username}
                      </strong>
                  </h1>
               </div>


               {/* right section*/}
               <div className={"flex flex-col gap-2"}>
                   <div className={"flex items-baseline gap-3"}>
                       <div className={"font-bold text-xl text-blue-500"}>user id :  </div>
                       <div className={"text-2xl font-bold"}> {value.user.data.user._id}</div>
                   </div>
                   <div className={"flex items-baseline gap-3"}>
                       <div className={"font-bold text-xl text-blue-500"}>email : </div>
                       <div className={"text-2xl font-bold"}>{value.user.data.user.email}</div>
                   </div>
                   <div className={"flex items-baseline gap-3"}>
                       <div  className={"font-bold text-xl text-blue-500"}>role :</div>
                       <div className={"text-2xl font-bold"}>{value.user.data.user.role}</div>
                   </div>

               </div>
           </div>


           <Footer/>
       </div>
    )
}

export default Profile;