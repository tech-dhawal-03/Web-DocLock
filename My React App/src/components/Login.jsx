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

  const[login,Setlogin]=useState({})

  const handleCred = (e)=>{
    console.log(e.target.value,e.target.name)

    Setlogin({
      ...login,
      [e.target.name]:e.target.value
    })

  }

  const authenticateLogin = async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:3000/login',{
      method : 'POST',
      body:JSON.stringify(login),
      headers:{
        'Content-Type':'application/json'
      }
   
    })
    console.log(await response.text())
  }
  return (
    <div className="login_body">
      <div className="container">
        <div className="drop">
          <div className="content">
            <h2>
              WELCOME BACK!! <br />
              LOG IN
            </h2>
            <form onSubmit={authenticateLogin}>
              <div className="inputbox">
                <FaUser className="icon_login" />
                <input type="text" placeholder="Username" required name="log_username" onChange={handleCred} />
              </div>
              <div className="inputbox">
                <FaLock className="icon_login" />
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  required name='log_password' onChange={handleCred}
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
