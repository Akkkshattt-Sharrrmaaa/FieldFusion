import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from "react-router-dom";


async function Logout(){

    const navi = useNavigate();
    try{
        const accessToken = localStorage.getItem("accessToken");
        console.log("Access token is , ", accessToken);
        const res = await axios.post("http://localhost:5000/api/logout", null , {
           headers: {
               'Authorization': `Bearer ${accessToken}`
           }
        })

        if(res.status === 200){
            console.log("Logout response status 200")
            console.log(res)
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            toast.success("Logout successfull")
            navi('/')
        }else{
            console.log("Logout response status not 200")
        }

    }catch(err){
        toast.error("Logout Unsuccessful")
        console.log("Inside catch block of Logout function")
        console.log(err)
    }
}

export default Logout;