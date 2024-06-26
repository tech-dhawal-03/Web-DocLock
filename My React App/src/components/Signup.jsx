import React from "react";
import signuppik from "../assets/signuppik.png";
import "../all_css/signup.css";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
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
                <FaEnvelope className="icon" />
                <input type="email" placeholder="E-mail" required />
              </div>
              <div className="inputbox_signup">
                <FaUser className="icon" />
                <input type="text" placeholder="Username" required />
              </div>
              <div className="inputbox_signup">
                <FaLock className="icon" />
                <input type="password" placeholder="Password" required />
              </div>
              <div className="inputbox_signup">
                <input type="submit" value="Sign-in" />
              </div>
              <a href=""><div>
                {<CustomButton />}
              
                
              </div>
              </a>
            </form>
          </div>
        </div>
        <Link to={"/login"} className="btns_signup login">
          Login
        </Link>
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
      <button className="signupgoogle_signup" onClick={login}>
        SignIn with Google
        
        
        
      </button>
    
    </div>
  
    

  
    
  )


}
