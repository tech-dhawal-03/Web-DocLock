import { React, useContext } from "react";
import logo from "../assets/logo1.png";
import document from "../assets/document.png";
import "../all_css/cardhome.css";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle, FaLock } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { MdPrivacyTip, MdInfoOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Context from "../context/Context";



function CardHome() {
  const pass = useContext(Context);

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

          <div className="card_container">
            {/* <!-- Card --> */}
            <div class="card">
              <div class="card__border">
                <div class="card__perfil">
                  <img src={logo} alt="" class="card__img" />
                </div>
              </div>

              <h3 class="card__name">DOC LOCKER</h3>
              <span class="card__profession">LOCK DOCUMENTS</span>

              {/* <!-- Card info --> */}
              <div class="info">
                <MdInfoOutline class="info__icon" />

                <div class="info__border">
                  <div class="info__perfil">
                    <img src={logo} alt="" class="info__img" />
                  </div>
                </div>

                <div class="info__data">
                  <h3 class="info__name">Doc Locker</h3>
                  <span class="info__profession">Online Vault</span>
                  <span class="info_desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nobis quis atque eaque velit vel aperiam vitae. lorem12
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default CardHome;
