import {Label} from "@radix-ui/react-label";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function SignupForm(props) {

    const {toggleForm} = props
    const [ signupData, setSignupData ] = useState({
        username : "",
        email : "",
        password : "",
        role : "user"
    })


    function formChangeHandler(event) {
        setSignupData( (prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value

        }))
    }

    const navi = useNavigate()

    const signupHandler = async () => {
        try{
            if(signupData.username === "" || signupData.email === "" || signupData.password === ""){
                toast.error("All fields are required");
            }else{
                   const Response = await axios.post("http://localhost:3000/api/v1/users/register", signupData)
                if(Response.status === 201){
                    console.log(Response.data)

                    toast.success("Signup successfull, You can login now")
                    toggleForm()

                }
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
            className=" text-black flex flex-col gap-4 bg-[#0071fb] px-5 py-10 rounded-md shadow-white  shadow-lg items-center border border-black ">
            <div className="text-3xl text-white font-salsa">
                New User
            </div>
            <div>
                <Label htmlFor="username" className="pl-3 text-amber-50">Username</Label>
                <Input type="text" name="username" placeholder="user1234" className="w-[20vw]" onChange={formChangeHandler} value={signupData.username}/>
            </div>
            <div>
                <Label htmlFor="email" className="pl-3 text-amber-50">Email</Label>
                <Input type="email" name="email" placeholder="johndoe@tempmail.com" className="w-[20vw] text-gray-700"  onChange={formChangeHandler} value={signupData.email}/>
            </div>
            <div>
                <Label htmlFor="password" className="pl-3 text-amber-50">Password</Label>
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
            <Button className={"bg-amber-50 text-blue-950 hover:bg-blue-700 hover:border hover:border-amber-50 hover:text-amber-50 hover:shadow hover:shadow-white"} onClick={signupHandler} >Signup</Button>

            {/* change form option*/}
            <div>
                Already have an account? <span className="underline text-amber-50 cursor-pointer" onClick={()=> (toggleForm())}>Login Now</span>
            </div>
        </div>
    )
}

export default SignupForm;