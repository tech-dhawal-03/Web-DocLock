import React, { useState } from "react";
import signuppik from "../assets/signuppik.png";
import "../all_css/signup.css";
import "../all_css/toast.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import Navbar from "./Navbar";
import { toast } from 'react-toastify';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";




function Signup() {
  let display = 0;
  let data;



  const navigate = useNavigate();
  const [visible, setVisiblity] = useState(false);






  const toggle = () => {
    setVisiblity(!visible);
  };

  // getting values inserted by the user in signup page
  const [form, Setform] = useState({});

  const handleValue = (e) => {
    // console.log(e.target.value,e.target.name)
    Setform({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log(JSON.stringify(form))
  };

  // getting all the values as js object on clicking submit button
  const handleform = async (e) => {
    e.preventDefault();


    // sending data to backend
    let response;


    try {
      response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (err) {
      console.log(err);
    }



    data = await response.text();
    console.log(data);
    console.log(typeof (data));

    if (data == "Error 101") {
      toast.error("User Already Exists");
      setTimeout(() => {
        toast.success("Login Here !!")
        navigate("/login")


      }, 800)



    }

    else if (data == "Error 102") {
      toast.error("Username / Email already taken")
      setTimeout(() => {
        toast.success("Sign in with other Account")
        navigate("/signup")

      },800)

    }

    else {
      toast.success("Registered Successfully")
      setTimeout(()=>{
        toast.success("Login Now !!")
      navigate("/login")

      },800)
      

    }












    // navigate("/login")


    ;
  }




  // if(response)
  // {
  // console.log(await response.text());
  // navigate("/login")
  // }

  // console.log(await response.text());
  // console.log(await response.json());


  // console.log(form);

  return (

    <>
      <Navbar />
      <div className="signup_body">
        <div className="container_signup">
          <div className="drop_signup">
            <div className="content_signup">
              <h2>
                NEW HERE!! <br />
                SIGN IN
              </h2>
              <form onSubmit={handleform} autoComplete="off">
                <div className="inputbox_signup">
                  <FaEnvelope className="icon" />
                  <input
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={handleValue}
                    name="Email"
                  />
                </div>
                <div className="inputbox_signup">
                  <FaUser className="icon" />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    onChange={handleValue}
                    name="Username"
                  />
                </div>
                <div className="inputbox_signup">
                  <FaLock className="icon" />
                  <input
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    required
                    onChange={handleValue}
                    name="Password"
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
          <Link to={"/login"} className="btns_signup login" >
            Login
          </Link>
        </div>

        <div className="aboutus_signup">
          <img src={signuppik} className="login_image_signup" />
        </div>
      </div>










      {/* <div className="popup_box" >
        <div className="tick">
          <IoMdCheckmarkCircleOutline className="tick_img" />
        </div>
        <h2>Hello</h2>
       </div>  */}










    </>
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


export function Popup(props) {

  return (
    <>

      <div className="popup_box" >
        <div className="tick">
          <IoMdCheckmarkCircleOutline className="tick_img" />
        </div>
        <h2>{props.message}</h2>
      </div>
    </>
  );
};