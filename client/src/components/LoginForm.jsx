import React, { useState } from "react";
import {Input} from "@/components/ui/input.jsx"
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@radix-ui/react-label";

function LoginForm(props) {

    const [showLogin, setShowLogin] = useState(false);

    function toggleFrom(){
        setShowLogin(!showLogin);
    }

    const [ loginData, setLoginData ] = useState({
        email : "",
        pass : ""
    })

    function formChangeHandler(event) {
        setLoginData( (prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value

        }))
    }


    return(
        <div className=" text-black flex flex-col gap-4 bg-light_blue_bg px-5 py-10 rounded-md shadow-white  shadow-lg items-center border border-black ">
            <div className="font-bold text-2xl text-dark_blue_bg font-salsa">
                {/*EXISTING USER*/}
                {showLogin ? <div>Existing User</div> : <div>New User</div> }
            </div>
            <div>
                <Label htmlFor="email" className="pl-3">Email</Label>
                <Input type="email" name="email" value ={loginData.email}  placeholder="Email" className="w-[20vw]" onChange={formChangeHandler}/>
            </div>
            <div>
                <Label htmlFor="password" className="pl-3">Password</Label>
               <Input type="password" placeholder="Password" value={loginData.password} onChange={formChangeHandler} className="w-[20vw]" name="password" />
            </div>

            {showLogin ? <Button className="w-[10vw]" onClick={toggleFrom}>Log in</Button>
                :
                <Button className="w-[10vw]" onClick={toggleFrom}>Sign Up</Button>
            }

            <div>
                {/*Don't Have an account? <span>Sign Up Now</span>*/}
                {showLogin ? <div>
                        Don't have and account? <span className="underline text-amber-50 cursor-pointer" onClick={()=> toggleFrom()}>Sign Up Now</span>
                    </div>
                    :
                    <div>
                        Already have an account? <span className="underline text-amber-50 cursor-pointer" onClick={() => toggleFrom()}>Login Now</span>
                    </div>}
            </div>
        </div>
    )
}

export default LoginForm;