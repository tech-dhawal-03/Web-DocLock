import React, { useState } from "react";
import loginpik from "../assets/loginpik.png";
import "../all_css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "./Navbar";

function Login() {
  const [visible, setVisiblity] = useState(false);

  const toggle = () => {
    setVisiblity(!visible);
  };

  const [login, Setlogin] = useState({});

  const handleCred = (e) => {
    console.log(e.target.value, e.target.name);

    Setlogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const authenticateLogin = async (e) => {
    e.preventDefault();
    const navigate = useNavigate();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data_received = await response.text();
    if (data_received) {
    }
  };
  return (
    <>
      <Navbar />
      <div className="login_body">
        <div className="container">
          <div className="drop">
            <div className="content">
              <h2>
                WELCOME BACK!! <br />
                LOG IN
              </h2>
              <form onSubmit={authenticateLogin} autoComplete="off">
                <div className="inputbox">
                  <FaUser className="icon_login" />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    name="log_username"
                    onChange={handleCred}
                  />
                </div>
                <div className="inputbox">
                  <FaLock className="icon_login" />
                  <input
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    required
                    name="log_password"
                    onChange={handleCred}
                  />
                  <span className="password_toggle_icon_login">
                    {visible ? (
                      <FaEyeSlash onClick={toggle} />
                    ) : (
                      <FaEye onClick={toggle} />
                    )}
                  </span>
                </div>
                <Link to={"/login-successful"}>
                  <div className="inputbox">
                    <input
                      type="submit"
                      value="Login"
                      // onClick={authenticateLogin}
                    />
                  </div>
                </Link>
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
    </>
  );
}

export default Login;
