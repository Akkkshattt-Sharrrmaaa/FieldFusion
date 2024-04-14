import {Button} from "@/components/ui/button.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function BookingPage() {

    const navi = useNavigate();
    const logoutHandler = async () => {
        try{
            const accessToken = localStorage.getItem("accessToken");
            const Response = await axios.post("http://localhost:3000/api/v1/users/logout", {},{ headers: { Authorization: `Bearer ${accessToken}` }});
            if(Response.status === 200){
                console.log(Response.data)
                localStorage.removeItem("accessToken", Response.data.data.accessToken)
                localStorage.removeItem("refreshToken", Response.data.data.refreshToken)
                toast.success("Logout successfull")
                navi('/')
            }

        }catch(error){
            toast.error("Logout Unsuccessful")
            console.log(error)
        }
    }

    return(
        <div>
            <p>This is the booking page</p>

            <Button onClick={logoutHandler}>Logout</Button>
        </div>
    )

}

export default BookingPage;