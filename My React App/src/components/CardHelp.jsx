import React, { useState } from "react";
import logo from "../assets/logo1.png";
import document from "../assets/document.png";
import "../all_css/cardhelp.css";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle, FaLock, FaArrowDown } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { IoIosArrowDropdown, IoIosArrowDropup, IoIosHelpCircle } from "react-icons/io";
import { Link } from "react-router-dom";

function CardHelp() {
  const [selected, setSelected] = useState(null);

  const toggle_accordion = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
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
                <button className="buttons">
                  <span>
                    <IoDocumentSharp className="vertical_nav_icon" />
                  </span>
                  <p>Documents</p>{" "}
                </button>
              </Link>
              <Link to={"/cardpassword"} className="widthfull">
                <button className="buttons">
                  <span>
                    <FaLock className="vertical_nav_icon" />
                  </span>
                  <p>Passwords</p>{" "}
                </button>
              </Link>
              <Link to={"/cardhelp"} className="widthfull">
                <button className="highlight">
                  <span>
                    <IoIosHelpCircle className="vertical_nav_icon" />
                  </span>
                  <p> Help</p>
                </button>
              </Link>
            </div>
            <img src={document} className="document_image" alt="" />
          </div>

          <div className="help_wrapper">
            <div className="help_accordion">
              {faqs.map((item, i) => (
                <div className="help_item" key={i}>
                  <div
                    className="help_title"
                    onClick={() => toggle_accordion(i)}
                  >
                    <h2>{item.question}</h2>
                    <span>
                     { selected ===i?  <IoIosArrowDropup fontSize={"30px"}/>: <IoIosArrowDropdown fontSize={"30px"}/>}
                    </span>
                  </div>
                  <div
                    className={
                      selected === i ? "help_content_show" : "help_content"
                    }
                  >
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const faqs = [
  {
    question: "How do I create a new document?",
    answer:
      "To create a new document, click on the 'Documents' tab and then select 'New Document'. Follow the prompts to set up your document.",
  },
  {
    question: "How do I link a document?",
    answer:
      "To link a document, go to the 'Documents' tab, find the document you want to link, and click 'Link Document'. Follow the instructions provided.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "To reset your password, navigate to the 'Passwords' section under 'Profile' and click on 'Reset Password'. You will receive an email with further instructions.",
  },
  {
    question: "What document formats are supported?",
    answer:
      "Our platform supports various document formats including PDF, DOCX, XLSX, and TXT.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact support by clicking on the 'Help' button in the navigation menu and selecting 'Contact Us'. You can reach us via email, phone, or live chat.",
  },
];

export default CardHelp;
