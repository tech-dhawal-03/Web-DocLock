import React, { useState, useEffect, useContext } from "react";
import loginpik from "../assets/loginpik.png";
import "../all_css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "../controllers/axios";
import { toast } from 'react-toastify';
import CardHome from "./CardHome";
import Context from "../context/Context";




function Login() {
  const pass = useContext(Context);





  const navigate = useNavigate();
  const [visible, setVisiblity] = useState(false);



  const toggle = () => {
    setVisiblity(!visible);
  };

  const [username, Setusername] = useState({})
  const [password, Setpassword] = useState({})












  const authenticateLogin = async (e) => {
  
    // Event.preventDefault();
      
    e.preventDefault();
    // navigate(`/login/login-successful`)

    // console.log(username);
    // console.log(password)
    // const navigate = useNavigate()


    // console.log("Please enter valid Username & Password")

    let err = 0;


    try {
      const result = await axios.post("/login", { username, password })
      console.log(result);

      if (result.data=="Invalid") {
        toast.error("Invalid Username or Password");
        err = 1;


        
        // login-successful
      }

      else
      {
        let User_id = result.data.username;
        let unique_id = result.data._id;

        pass.setPerson({
          email : result.data.email,
          username : User_id,
          password : password
        })

       
        User_id = User_id.charAt(0).toUpperCase() + User_id.substring(1).toLowerCase();
      

        pass.setUser_Id(unique_id);  
        pass.setUser_data(User_id);


       toast.success("Login Successful !")
        navigate(`/login-successful/user-personal-info/${unique_id}`)
       // pass.setUser_Id("");

       err = 1;
     }

      

   }

   catch (Error) {
     console.log(Error)
   }
  

 if (err === 0) {
   console.log("Invalid");
   toast.error("Invalid Username or Password")
 }
}





useEffect(() => {
  authenticateLogin();

}, []);


// using fetch api
// const response = await fetch('http://localhost:3000/login', {
//   method: 'POST',
//   body: JSON.stringify(login),
//   headers: {
//     'Content-Type': 'application/json'

//   }


// })
// const data_received = await response.text();





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
            <form onSubmit={authenticateLogin}
              autoComplete="off">
              <div className="inputbox">
                <FaUser className="icon_login" />
                <input type="text" placeholder="Username" required onChange={(e) => Setusername(e.target.value)} />
              </div>
              <div className="inputbox">
                <FaLock className="icon_login" />
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  required onChange={(e) => Setpassword(e.target.value)}
                />
                <span className="password_toggle_icon_login">
                  {visible ? (
                    <FaEyeSlash onClick={toggle} />
                  ) : (
                    <FaEye onClick={toggle} />
                  )}
                </span>
              </div>
              <Link to={"/cardprofile"}>
                <div className="inputbox">
                  <input
                    type="submit"
                    value="Login"
                    onClick={authenticateLogin}
                   
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
