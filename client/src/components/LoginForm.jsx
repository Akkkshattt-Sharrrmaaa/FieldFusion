import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


function LoginForm(props) {

    const navi = useNavigate();
    const {toggleForm} = props
    const [ loginData, setLoginData ] = useState({
        email : "",
        password : ""
    })


    function formChangeHandler(event) {
        setLoginData( (prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value

        }))
    }

    const loginHandler = async () => {
        try{

            const Response = await axios.post("http://localhost:3000/api/v1/users/login", loginData)
            if(Response.status === 200){
                // console.log(Response.data)
                localStorage.setItem("accessToken", Response.data.data.accessToken)
                localStorage.setItem("refreshToken", Response.data.data.refreshToken)
                toast.success("Login successfull")
                navi('/booking')
            }

        }catch(error){
            toast.error("Email or password is incorrect")
            console.log("Error during login")
            console.log(error)
        }
    }

    return (
        <div
            className=" text-black flex flex-col gap-4 bg-light_blue_bg px-5 py-10 rounded-md shadow-white  shadow-lg items-center border border-black ">
            <div className=" text-3xl text-white font-salsa">
                Existing User
            </div>
            <div>
                <Label htmlFor="email" className="pl-3">Email</Label>
                <Input type="email" name="email" placeholder="Email" className="w-[20vw]"  onChange={formChangeHandler} value={loginData.email}/>
            </div>
            <div>
                <Label htmlFor="password" className="pl-3">Password</Label>
                <Input type="password" placeholder="Password" className="w-[20vw]" name="password" onChange={formChangeHandler} value={loginData.password}/>
            </div>

            {/*button*/}
            <Button onClick={loginHandler}>Login</Button>
            {/* change form option*/}
            <div>
                Don't have and account? <span className="underline text-amber-50 cursor-pointer" onClick={()=> (toggleForm())}>Sign Up Now</span>
            </div>
        </div>
    )
}

export default LoginForm;