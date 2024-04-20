import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

function SignupForm(props) {

    const {toggleForm} = props
    const [ signupData, setSignupData ] = useState({
        username : "",
        email : "",
        password : "",
        role : ""
    })


    function formChangeHandler(event) {
        setSignupData( (prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value

        }))
    }

    const signupHandler = async () => {
        try{

            const Response = await axios.post("http://localhost:3000/api/v1/users/register", signupData)
            if(Response.status === 201){
                console.log(Response.data)

                toast.success("Signup successfull, You can login now")
                toggleForm()

            }else{
                // toast.error("Different status code")
                toast.error(Response.status)
                // console.log(Response)
            }

        }catch(error){
            // toast.error("Email or Username already in use")
            toast.error(Response)
            console.log("Error during login")
            console.log(error)
        }
    }


    return (
        <div
            className=" text-black flex flex-col gap-4 bg-light_blue_bg px-5 py-10 rounded-md shadow-white  shadow-lg items-center border border-black ">
            <div className="text-3xl text-white font-salsa">
                New User
            </div>
            <div>
                <Label htmlFor="username" className="pl-3 ">Username</Label>
                <Input type="text" name="username" placeholder="Username" className="w-[20vw]" onChange={formChangeHandler} value={signupData.username}/>
            </div>
            <div>
                <Label htmlFor="email" className="pl-3">Email</Label>
                <Input type="email" name="email" placeholder="Email" className="w-[20vw]"  onChange={formChangeHandler} value={signupData.email}/>
            </div>
            <div>
                <Label htmlFor="password" className="pl-3">Password</Label>
                <Input type="password" placeholder="Password" className="w-[20vw]" name="password" onChange={formChangeHandler} value={signupData.password}/>
            </div>
            <div className="flex flex-col">
                <Label htmlFor="role" className="pl-3">Role</Label>
                <select name="role" id="role" onChange={formChangeHandler} value={signupData.role} defaultValue="user"  className="w-[20vw] h-[2.5rem] text-[14px] rounded-md">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {/*button*/}
            <Button onClick={signupHandler} >Signup</Button>

            {/* change form option*/}
            <div>
                Already have an account? <span className="underline text-amber-50 cursor-pointer" onClick={()=> (toggleForm())}>Login Now</span>
            </div>
        </div>
    )
}

export default SignupForm;