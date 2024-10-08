
import React, { useEffect, useState } from "react";
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
import axios from "../controllers/axios";
import { lightGreen } from "@mui/material/colors";



function CardHome() {
  const pass = useContext(Context);
  let user_details;



  const [editing, setEditing] = useState(false);
  

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    contacts: "",
    password: "",
    image : logo
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });


  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        user_details = await axios.get(`/login-successful/user-personal-info/${pass.user_id}`);
        user_details = user_details.data.personal_details;
        console.log(user_details);
        

          setTempProfile(
            {
              ...tempProfile,
              firstName: user_details.firstName,
              lastName: user_details.lastName,
              contacts: user_details.contacts,
              
            }
          )

        
        

       

      }

      catch (err) {
        if (err) throw err;
      }

    }


    fetchCredentials();

  }, [])

  useEffect(()=>{
    console.log(tempProfile);
    setProfile(tempProfile);
  },[tempProfile]);



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


  const handleSave = async () => {
    


    console.log(tempProfile);
    setProfile(tempProfile);
    //inserting data into database...

    try {
    
      const result = await axios.post(`/login-successful/user-personal-info/${pass.user_id}`, tempProfile);
      // console.log(result);
      const personal_id = result.data._id;

      const add_personal_info = axios.put(`/login-successful/user-personal-info/${pass.user_id}/${personal_id}`);

    }



    catch (e) {
      if (e) throw e;
    }

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
              <Link to={`/user-personal-info/${pass.user_id}`} className="widthfull">
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
              <Link to={`/user-personal-credentials-info/${pass.user_id}`}
                className="widthfull"
              >
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
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="profile_input"
                    value={profile.firstName}
                    disabled
                  />
                </div>
                <div className="detail-item">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="profile_input"
                    value={profile.lastName}
                    disabled
                  />
                </div>
                <div className="detail-item">
                  <label htmlFor="contacts">Contacts</label>
                  <input
                    type="number"
                    id="contacts"
                    className="profile_input"
                    value={profile.contacts}
                    disabled
                  />
                </div>
              </div>
              <div className="text_input">
                <div className="detail-item">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="profile_input"
                    value={pass.person.email}
                    disabled
                  />
                </div>
                <div className="detail-item">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="profile_input"
                    value={pass.person.username}
                    disabled
                  />
                </div>
                <div className="detail-item">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="profile_input"
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
                        <Button variant="contained" onClick={handleSave}>
                          Save
                        </Button>
                        <Button variant="contained" onClick={handleCancel}>
                          Cancel
                        </Button>
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
