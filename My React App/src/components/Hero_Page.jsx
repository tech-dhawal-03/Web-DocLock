import React from "react";
import Img_1 from "../assets/locker.png";
import Caraousel from "./Caraousel";
import CardHome from "./CardHome";

function Hero_Page() {
  return (
    <>
      <div className="header">
        <img src={Img_1} width="105px" height="90px"></img>
        <br />
        Securely Save, <br /> Organize & Protect <br />
        <span className="subline">
          Your Digital Vault for Documents & Passwords
        </span>
      </div>

      {/* <Caraousel /> */}

      <CardHome />
    </>
  );
}
export default Hero_Page;
