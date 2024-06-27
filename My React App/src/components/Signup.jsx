import React, { useState } from "react";
import signuppik from "../assets/signuppik.png";
import "../all_css/signup.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const [visible, setVisiblity] = useState(false);

  const toggle = () => {
    setVisiblity(!visible);
  };
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
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  required
                />
                <span className="password_toggle_icon">
                  {visible ? (
                    <FaEyeSlash onClick={toggle} />
                  ) : (
                    <FaEye onClick={toggle} />
                  )}
                </span>
              </div>

              <div className="inputbox_signup">
                <input type="submit" value="Sign-in" />
              </div>
              <a href="">
                <div>{<CustomButton />}</div>
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
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  return (
    <div>
      <button className="signupgoogle_signup" onClick={login}>
        <span>
          <FcGoogle className="icon_google" />
        </span>
        SignIn with Google
      </button>
    </div>
  );
};
