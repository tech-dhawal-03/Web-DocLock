import React from "react";
import signuppik from "../assets/signuppik.png";
import "../all_css/signup.css";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import Google from "../assets/google_logo.png";


function Signup() {
  return (
    <div className="signup_body">
      <div className="container_signup">
        <div className="drop_signup">
          <div className="content_signup">
            <h2>
              NEW HERE!! <br />
              SIGN IN
            </h2>
            <form>
              <div className="inputbox_signup">
                <input type="text" placeholder="Username" required />
              </div>
              <div className="inputbox_signup">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="inputbox_signup">
                <input type="submit" value="Sign-in" />
              </div>
            </form>
          </div>
        </div>
        <a href="#" className="btns_signup">
          Forget Password
        </a>
        <Link to={"/login"} className="btns_signup login">
          Login
        </Link>
        <a href="#" className="btns_signup signupgoogle_signup">
          SignIn with Google
        </a>
      </div>
      <div className="aboutus_signup">
        <img src={signuppik} className="login_image_signup" />
      </div>
    </div>
  );
}

export default Signup;

export const CustomButton = () => {
  const login = useGoogleLogin({
    onSuccess: codeResponse => console.log(codeResponse),
    flow: 'auth-code',
  });

 
  return(
    <div>
      <button className="google_signin"onClick={login}>
        <img src={Google} width="50px"></img>
        
        
      </button>
    
    </div>
  
    

  
    
  )


}

