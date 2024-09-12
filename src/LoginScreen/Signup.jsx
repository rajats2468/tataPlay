import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../util";
import {ToastContainer} from "react-toastify";

export default function () {
    const Navigate = useNavigate();
    async function handleSignup(e){
        e.preventDefault();

        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);

        const {username,email,password} = data;
        if(!username || !email || !password){
            console.log("empty")
           return handleError("All Fiels are mandatory");
        }

        try{
            const url = "http://localhost:5001/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(data)

            })
            const result = await response.json();
            const {message,success,error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    Navigate("/login")
                },1000)
            }
            else if(error){
                const details = error?.details[0].message;
                return handleError(details)
            }
            else if (!success) {
                handleError(message)
            }
        }
        catch(e){
            console.log(e);
        }

        

    }

    return (
        <div className="container">
            <h2>TATA PLAY <span>M-sales</span></h2>
            <form onSubmit={handleSignup}>
                <div >
                    <input type="email" name="email" placeholder="EMAIL" />
                </div>
                <div>
                    <input type="text" name="username" placeholder="User Name" />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div>
                    <div className="version"> 
                        <h5>Version 2.8.0</h5>
                        <span>Already have an account? <Link className="link" to={"/"}>Login</Link></span>
                    </div>

                </div>
                <button type="submit">
                    SIGNUP
                </button>

            </form>
            <ToastContainer/>
        </div>
    )
}