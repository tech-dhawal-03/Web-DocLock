import React, { useContext, useState, useEffect } from "react";
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
import Context from "../context/Context";
import { toast } from 'react-toastify';
import axios from "../controllers/axios";


function CardPassword() {



  

  let fetchCredentials;
  let handleAddCredential;
  const pass = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [website, setWebsite] = useState("");
  const [credentials, setCredentials] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [password_id,setPassword_id] = useState("");

  



  const u_id = pass.user_id;
  let post;





  useEffect(() => {
    fetchCredentials = async () => {
      try {
        await axios.get("/card-add-passwords", {
          params:
          {
            user_id: u_id

          }
        }).
          then(function (docs, err) {
            if (err) throw err;
            

            else setCredentials(docs.data)
            

          })



      } catch (error) {
        console.error("There was an error fetching the credentials!", error);
      }
    };

    fetchCredentials();
  }, []);



  handleAddCredential = async (e) => {
    if (username && password && website) {
      setCredentials([{ website, username, password }, ...credentials]);
      setUsername("");
      setPassword("");
      setWebsite("");

      // we have got website,username,password here....


      e.preventDefault();

      //setting up axios to send data to backend
      // for the first time registering in database
      try {


        //inserting into password collection
        const result = await axios.post("/card-add-passwords/", { website, username, password })
        // console.log(result_post_data);
        post = result.data._id;
        console.log(post);
        setPassword_id(post);
        // console.log(password_id);
       
        

        //putting entered password to user collection
        const add_password = await axios.put(`/card-add-passwords/${u_id}`, { post })
        console.log("Added Successfully");
        
        

      }  
      catch (err) {
        console.log(err);
      }
      
    }
     else {
      toast.error("All fields are Mandatory");
    }

    
  };

  

  const handleSaveCredential = async(index) => {
    const updated_info = credentials[index];
    console.log(updated_info);
    // console.log(updated_info);
    setEditIndex(null);
    // console.log(typeof(credentials));
    // // console.log(credentials);
    // //saving edited data to backend...
    let result;

    try{
         result = await axios.put(`/card-add-passwords/${u_id}/update`,{updated_info});
  
      }catch(err)
      {
        console.log(err)
      }


  
  };






  const handleEditCredential = (index, field, value) => {
    // Event.preventDefault();


    const updatedCredentials = credentials.map((cred, i) =>
      i === index ?
        { ...cred, [field]: value }
        : cred
      

    );
    
    setCredentials(updatedCredentials);

  };




  const handleDeleteCredential = async(index) => {
    const updatedCredentials = credentials.filter((_, i) => i !== index);
    setCredentials(updatedCredentials);
    console.log(password_id);

    

    //deleting from database
    let deleted= credentials[index];
  

    if(deleted._id)
    {
      deleted = deleted._id

    }

    else{
      deleted = password_id;
    }
    
   
   
    let result;

    try{
     result = await axios.delete(`/card-add-passwords/${u_id}/delete/${deleted}`);
    }catch(err)
    {
      console.log(err);
    }

    
      }
    
  return (
    <>
      <div className="cardhome_container">
        <div className="upper_bar">
          <img src={logo} alt="" />
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
              <Link to="/card-add-passwords" className="widthfull">
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
            <h2>Add Credentials</h2>
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
              <IoIosSave cursor={"pointer"} fontSize={"40px"} color="white" onClick={handleAddCredential} />
            </div>

            <h3>Credentials</h3>
            <div className="credential-list">
              <div className="credential-header">
                <div className="credential-column">Website</div>
                <div className="credential-column">Username</div>
                <div className="credential-column">Password</div>
              </div>


              {/* adding from here */}
              {credentials.map((credential, index) => (
                <div className="credential-row" key={index}>
                  {editIndex === index ?


                    (
                      // if condition

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
                          <GrUpdate cursor={"pointer"} fontSize={"30px"} color="white" onClick={() => handleSaveCredential(index)} />
                          <MdDelete cursor={"pointer"} fontSize={"30px"} color="white" onClick={() => handleDeleteCredential(index)} />
                        </div>
                      </>
                    ) :
                    (
                      // else
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
                          <MdDelete cursor={"pointer"} fontSize={"30px"} color="white" onClick={() => handleDeleteCredential(index)} />
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
