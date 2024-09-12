import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../util";
import { ToastContainer } from "react-toastify";
export default function () {
    const navigate =  useNavigate();
   async function handleLogin(e){
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd.entries());
        console.log(data);
        try{
            const url = "http://localhost:5001/auth/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                },
                body:JSON.stringify(data)
            });
            const result = await response.json();
            const {success,message,error,token,username} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem("token",token);
                localStorage.setItem("name",username);
                setTimeout(() => {
                    navigate("/home");
                },1000);
            }
            else if(error){
                const details = error?.details[0].message;
                return handleError();
            }
            else if (!success) {
                handleError(message);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div className="container">
            <h2>TATA PLAY <span>M-sales</span></h2>
            <form onSubmit={handleLogin} >
                <div >
                    <input type="text" name="username" placeholder="User Name" maxLength={10}/>
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div className="version">
                    <h5>Version 2.8.0</h5>
                    <span>Doesn't have an account?
                        <Link className="link" to={"/signup"}>Signup</Link>
                    </span>
                </div>
                <button type="submit">
                    LOGIN
                </button>
            </form>
            <ToastContainer/>

        </div>
    )
}