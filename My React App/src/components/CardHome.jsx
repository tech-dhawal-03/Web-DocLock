import React from "react";
import logo from "../assets/logo1.png";
import document from "../assets/document.png";
import "../all_css/cardhome.css";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { MdPrivacyTip } from "react-icons/md";
import { Link } from "react-router-dom";

function CardHome() {
  return (
    <div className="cardhome_container">
      <div className="upper_bar">
        <img src={logo} alt="" />
        <div className="welcome">
          <h1>Welcome</h1>
          <h3>Email</h3>
        </div>
      </div>

      <div className="vertical_nav">
      <Link to={"/logout-successful"}>
        <button className="logout">
          <div>
            <CiLogout className="logout_icon" />
          </div>

          <p>Logout</p>
        </button>
        </Link>
        <div className="nav_content">
          <button>
            <span>
              <FaUserCircle className="vertical_nav_icon" />
            </span>
            <p>Profile</p>{" "}
          </button>
          <button>
            <span>
              <IoDocumentSharp className="vertical_nav_icon" />
            </span>
            <p>Documents</p>{" "}
          </button>
          <button>
            <span>
              <FaLock className="vertical_nav_icon" />
            </span>
            <p>Passwords</p>{" "}
          </button>
          <button>
            <span>
              <IoIosHelpCircle className="vertical_nav_icon" />
            </span>
            <p> Help</p>
          </button>
          <button>
            <span>
              <MdPrivacyTip className="vertical_nav_icon" />
            </span>
            <p>Privacy Policy</p>{" "}
          </button>
        </div>
        <img src={document} className="document_image" alt="" />
      </div>
    </div>
  );
}

export default CardHome;
