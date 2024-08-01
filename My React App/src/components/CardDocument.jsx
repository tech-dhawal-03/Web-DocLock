import React from "react";
import logo from "../assets/logo1.png";
import document from "../assets/document.png";
import "../all_css/carddocument.css";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import { Link } from "react-router-dom";

function CardDocument() {
  return (
    <>
      <div className="cardhome_container">
        <div className="upper_bar">
          <img src={logo} alt="" />
          <div className="welcome">
            <h1>Welcome</h1>
            <h3>Email</h3>
          </div>
        </div>

        <div className="nav_container_card">
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
              <Link to={"/cardprofile"} className="widthfull">
                <button className="buttons">
                  <span>
                    <FaUserCircle className="vertical_nav_icon" />
                  </span>
                  <p>Profile</p>{" "}
                </button>
              </Link>
              <Link to={"/carddocument"} className="widthfull">
                {" "}
                <button className="highlight">
                  <span>
                    <IoDocumentSharp className="vertical_nav_icon" />
                  </span>
                  <p>Documents</p>{" "}
                </button>
              </Link>
              <Link to={"/card-add-passwords"} className="widthfull">
                <button className="buttons">
                  <span>
                    <FaLock className="vertical_nav_icon" />
                  </span>
                  <p>Passwords</p>{" "}
                </button>
              </Link>
              <Link to={"/cardhelp"} className="widthfull">
                <button className="buttons">
                  <span>
                    <IoIosHelpCircle className="vertical_nav_icon" />
                  </span>
                  <p> Help</p>
                </button>
              </Link>
            </div>
            <img src={document} className="document_image" alt="" />
          </div>
          <div className="document_container">
            <div className="doc d1">erergeg</div>
            <div className="doc d2">ergerg</div>
            <div className="doc d3">ergerg</div>
            <div className="doc d4">egerg</div>
            <div className="doc">eqrge4e</div>
            <div className="doc">uji5u756</div>
            <div className="doc">5eu5uj</div>
            <div className="doc">rthrthjr</div>
            <div className="doc">yuj567ikj</div>
            <div className="doc">uji5u756</div>
            <div className="doc">5eu5uj</div>
            <div className="doc">rthrthjr</div>
            <div className="doc">yuj567ikj</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDocument;
