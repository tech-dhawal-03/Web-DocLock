import React, { useState } from "react";
import loginpik from "../assets/loginpik.png";
import "../all_css/login.css";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [visible, setVisiblity] = useState(false);

  const toggle = () => {
    setVisiblity(!visible);
  };
  return (
    <div className="login_body">
      <div className="container">
        <div className="drop">
          <div className="content">
            <h2>
              WELCOME BACK!! <br />
              LOG IN
            </h2>
            <form>
              <div className="inputbox">
                <FaUser className="icon_login" />
                <input type="text" placeholder="Username" required />
              </div>
              <div className="inputbox">
                <FaLock className="icon_login" />
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  required
                />
                <span className="password_toggle_icon_login">
                  {visible ? (
                    <FaEyeSlash onClick={toggle} />
                  ) : (
                    <FaEye onClick={toggle} />
                  )}
                </span>
              </div>
              <div className="inputbox">
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
        <a href="#" className="btns">
          Forgot Password?
        </a>
        <Link to={"/signup"} className="btns signup">
          SignUp
        </Link>
      </div>
      <div className="aboutus">
        <img src={loginpik} className="login_image" />
      </div>
    </div>
  );
}

export default Login;
