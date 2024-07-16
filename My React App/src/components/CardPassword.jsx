import React, { useState } from "react";
import logo from "../assets/logo1.png";
import document from "../assets/document.png";
import "../all_css/cardpassword.css";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle, FaLock, FaEdit } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { IoIosHelpCircle, IoIosSave } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";

function CardPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [credentials, setCredentials] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddCredential = () => {
    if (username && password && website) {
      setCredentials([{ website, username, password }, ...credentials]);
      setUsername("");
      setPassword("");
      setWebsite("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleSaveCredential = (index) => {
    setEditIndex(null);
  };

  const handleEditCredential = (index, field, value) => {
    const updatedCredentials = credentials.map((cred, i) =>
      i === index ? { ...cred, [field]: value } : cred
    );
    setCredentials(updatedCredentials);
  };

  const handleDeleteCredential = (index) => {
    const updatedCredentials = credentials.filter((_, i) => i !== index);
    setCredentials(updatedCredentials);
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
                <button className="highlight">
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

          {/* credential code */}
          <div className="credential-container">
            <h2>Add Credential</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Website Name"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <IoIosSave cursor={"pointer"} fontSize={"40px"} color="white" onClick={handleAddCredential}/>
            </div>

            <h3>Credential List</h3>
            <div className="credential-list">
              <div className="credential-header">
                <div className="credential-column">Website</div>
                <div className="credential-column">Username</div>
                <div className="credential-column">Password</div>
              </div>
              {credentials.map((credential, index) => (
                <div className="credential-row" key={index}>
                  {editIndex === index ? (
                    <>
                      <div className="credential-column">
                        <input
                          type="text"
                          value={credential.website}
                          onChange={(e) =>
                            handleEditCredential(
                              index,
                              "website",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="credential-column">
                        <input
                          type="text"
                          value={credential.username}
                          onChange={(e) =>
                            handleEditCredential(
                              index,
                              "username",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="credential-column">
                        <input
                          type="text"
                          value={credential.password}
                          onChange={(e) =>
                            handleEditCredential(
                              index,
                              "password",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="credential-update">
                        <GrUpdate cursor={"pointer"} fontSize={"30px"} color="white" onClick={() => handleSaveCredential(index)}/>
                        <MdDelete cursor={"pointer"} fontSize={"30px"} color="white" onClick={() => handleDeleteCredential(index)}/>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="credential-column">
                        {credential.website}
                      </div>
                      <div className="credential-column">
                        {credential.username}
                      </div>
                      <div className="credential-column">
                        {credential.password}
                      </div>
                      <div className="credential-update">
                        <FaEdit cursor={"pointer"} fontSize={"30px"} color="white" onClick={() => setEditIndex(index)} />
                        <MdDelete cursor={"pointer"} fontSize={"30px"} color="white" onClick={() => handleDeleteCredential(index)}/>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPassword;
