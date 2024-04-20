import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CheckoutPage() {

    const navi = useNavigate()

    useEffect(() => {

        const accessToken = localStorage.getItem("accessToken");
        if(!accessToken){
            navi("/")
        }
        const Response = axios.get('http://localhost:3000/api/v1/users/current-user', {
            headers: { Authorization: `Bearer ${accessToken}` }
        })

    }, []);

    return(
        <div>
            This is checkout page
        </div>
    )

}

export default CheckoutPage;