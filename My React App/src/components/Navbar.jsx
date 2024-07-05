import React from "react";
import Img_3 from "../assets/logo1.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="container_navbar">
        <div className="navbar">
          <a href="#">
            <img src={Img_3} className="logo_navbar"></img>
          </a>
          <div className="navbar_content">
            <h1 className="navbar_text">
              <Link to={`/`}>Home</Link>
            </h1>

            <Link to={`/login`}>
              <h1 className="navbar_text">Login</h1>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
