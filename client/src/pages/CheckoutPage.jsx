import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "@/components/Logo.jsx";
import AvatarDropdown from "@/components/AvatarDropdown.jsx";
import Footer from "@/components/Footer.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Card from "@/components/Card.jsx";
import {CardContent} from "@/components/ui/card.jsx";


function CheckoutPage() {

    const navi = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //
    //         const accessToken = localStorage.getItem("accessToken");
    //         if(!accessToken){
    //             navi('/')
    //             toast.error("Unauthorized");
    //         }
    //         axios.get('http://localhost:3000/api/v1/users/current-user', {
    //         headers: { Authorization: `Bearer ${accessToken}` }
    //         }).then(response => {
    //             console.log(response.data.data)
    //             setData(response.data.data);
    //             setLoading(false);
    //             // console.log(data)
    //         }).catch(err=>{
    //             console.log(err)
    //             console.log("use effect ke catch block me")
    //         })
    //
    //
    // }, []);

    return(
        <div
            className="relative"
        >
            {/* left logo */}
            <div
                className="absolute top-5 left-5"
            >
                <Logo />
            </div>

            {/* right avatar panel*/}
            {/*<div*/}
            {/*    className="absolute top-5 right-5 "*/}
            {/*>*/}
            {/*   <AvatarDropdown name={data.username} />*/}
            {/*</div>*/}

            {/* main content */}
            <div>

                {/* left*/}
                <div>
                    <div> Gorilla Cage </div>
                    <div> Near UPES, Bidholi, Dehradun</div>
                </div>

                <div>

                </div>

            </div>

            <Footer />

        </div>
    )

}

export default CheckoutPage;