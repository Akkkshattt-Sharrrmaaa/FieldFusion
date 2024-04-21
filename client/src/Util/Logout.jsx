import axios from "axios";
import toast from "react-hot-toast";
import {useContext} from "react";
import {userContext} from "@/context/context.js";
import {useNavigate} from "react-router-dom";

async function Logout(){

        const navi = useNavigate();
        const value = useContext(userContext)

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

    export default Logout;