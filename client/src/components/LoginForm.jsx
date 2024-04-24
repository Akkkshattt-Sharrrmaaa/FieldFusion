import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {userContext} from "@/context/context.js";

function LoginForm(props) {

    const value = useContext(userContext)
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
                localStorage.setItem("accessToken", Response.data.data.accessToken)
                localStorage.setItem("refreshToken", Response.data.data.refreshToken)
                value.setUser(Response.data)
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
            className=" text-black flex flex-col gap-4 bg-[#0071fb] px-5 py-10 rounded-md  items-center border border-black shadow-2xl shadow-blue-400 hover:scale-105 transition duration-200 ease-in-out ">
            <div className=" text-3xl text-white font-salsa">
                Existing User
            </div>
            <div>
                <Label htmlFor="email" className="pl-3 text-amber-50">Email</Label>
                <Input type="email" name="email" placeholder="johndoe@tempmail.com" className="w-[20vw]"  onChange={formChangeHandler} value={loginData.email}/>
            </div>
            <div>
                <Label htmlFor="password" className="pl-3 text-amber-50">Password</Label>
                <Input type="password" placeholder="1234abcd" className="w-[20vw]" name="password" onChange={formChangeHandler} value={loginData.password}/>
            </div>

            {/*button*/}
            <Button className={"bg-amber-50 text-blue-950 hover:bg-blue-700 hover:border hover:border-amber-50 hover:text-amber-50 hover:shadow hover:shadow-white"} onClick={loginHandler}>Login</Button>
            {/* change form option*/}
            <div>
                Don't have an account? <span className="underline text-amber-50 cursor-pointer" onClick={()=> (toggleForm())}>Sign Up Now</span>
            </div>
        </div>
    )
}

export default LoginForm;