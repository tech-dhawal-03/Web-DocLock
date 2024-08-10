import React, { useState } from "react";
import logo from "../assets/logo1.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import document from "../assets/document.png";
import "../all_css/cardhome.css";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { useContext } from "react";

function CardHome() {

  const pass = useContext(Context);
  
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    socials: "",
    contacts: "",
    email: "",
    username: "",
    password: "",
    image: logo,
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTempProfile({ ...tempProfile, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setTempProfile({ ...tempProfile, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = () => setEditing(true);
  const handleSave = () => {
    setProfile(tempProfile);
    setEditing(false);
  };
  const handleCancel = () => {
    setTempProfile(profile);
    setEditing(false);
  };

  return (
    <>

      <div className="cardhome_container">
        <div className="upper_bar">
          <img src={logo} alt="logo" />
          <div className="welcome">
            <h1>Welcome</h1>
            <h3>{pass.user_data}</h3>
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
                <button className="highlight">
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
              <Link to={`/card-add-passwords/${pass.user_id}`} className="widthfull">
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

          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-image">
                <img id="profile-img" src={profile.image} alt="Profile" />
              </div>
              <h1 id="full-name">{`${profile.firstName} ${profile.lastName}`}</h1>
            </div>
            <div className="profile-details">
              <div className="text_input">
                <div className="detail-item">
                  <TextField
                    className="profile_input"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="filled"
                    id="firstName"
                    value={profile.firstName}
                    disabled
                  />
                </div>
                <div className="detail-item">
                  <TextField
                    className="profile_input"
                    label="Last Name"
                    type="text"
                    variant="filled"
                    fullWidth
                    id="lastName"
                    value={profile.lastName}
                    disabled
                  />
                </div>
                <div className="detail-item">
                  <TextField
                    className="profile_input"
                    label="Contacts"
                    type="number"
                    fullWidth
                    variant="filled"
                    id="contacts"
                    value={profile.contacts}
                    disabled
                  />
                </div>
              </div>
              <div className="text_input">
                <div className="detail-item">
                  <TextField
                    className="profile_input"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="filled"
                    id="email"
                    value={profile.email}
                    disabled
                  />
                </div>
                <div className="detail-item">
                  <TextField
                    className="profile_input"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="filled"
                    id="username"
                    value={profile.username}
                    disabled
                  />
                </div>
                <div className="detail-item">
                  <TextField
                    className="profile_input"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="filled"
                    id="password"
                    value={profile.password}
                    disabled
                  />
                </div>
              </div>
              <div className="profile-actions">
                <Button variant="contained" onClick={handleEdit}>
                  Update Details
                </Button>
              </div>
              {editing && (
                <div className="modal">
                  <div className="modal-content">
                    <h2>Update Profile</h2>
                    <div className="profile-edit">
                      <div className="profile-image-edit">
                        <img
                          id="temp-profile-img"
                          src={tempProfile.image}
                          alt="Profile"
                        />
                        <label for="img-upload" class="img-upload">
                          Change Image
                        </label>
                        <input
                          type="file"
                          id="img-upload"
                          title="hello"
                          onChange={handleImageChange}
                        />
                        
                      </div>
                      <div className="detail-item">
                        <TextField
                          variant="filled"
                          className="modal_input"
                          size="small"
                          fullWidth
                          label="FirstName"
                          type="text"
                          id="firstName"
                          value={tempProfile.firstName}
                          onChange={handleInputChange}
                        ></TextField>
                      </div>
                      <div className="detail-item">
                        <TextField
                          variant="filled"
                          className="modal_input"
                          size="small"
                          fullWidth
                          label="LastName"
                          type="text"
                          id="lastName"
                          value={tempProfile.lastName}
                          onChange={handleInputChange}
                        ></TextField>
                      </div>
                      <div className="detail-item">
                        <TextField
                          variant="filled"
                          className="modal_input"
                          fullWidth
                          size="small"
                          label="Contact"
                          type="number"
                          id="contacts"
                          value={tempProfile.contacts}
                          onChange={handleInputChange}
                        ></TextField>
                      </div>
                      <div className="detail-item">
                        <TextField
                          variant="filled"
                          className="modal_input"
                          fullWidth
                          size="small"
                          label="Password"
                          type="password"
                          id="password"
                          value={tempProfile.password}
                          onChange={handleInputChange}
                        ></TextField>
                      </div>
                      <div className="modal-actions">
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                        <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default CardHome;
