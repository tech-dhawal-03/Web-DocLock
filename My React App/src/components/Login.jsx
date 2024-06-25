import React from "react";
import loginpik from "../assets/loginpik.png";
import "../all_css/login.css";
import { Link } from "react-router-dom";

function Login() {
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
                <input type="text" placeholder="Username" required />
              </div>
              <div className="inputbox">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="inputbox">
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
        <a href="#" className="btns">
          Forget Password
        </a>
        <Link to={"/signup"} className="btns signup">
          SignUp
        </Link>
        <a href="#" className="btns signupgoogle">
          SignIn with Google
        </a>
      </div>
      <div className="aboutus">
        <img src={loginpik} className="login_image" />
      </div>
    </div>
  );
}

export default Login;
