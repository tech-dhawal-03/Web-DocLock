import React, { useState } from "react";
import "../all_css/popup.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function Popup() {
  return (
    <div className="popup_box">
      <div className="tick">
        <IoMdCheckmarkCircleOutline className="tick_img" />
      </div>
      <h2>Login Successful!</h2>
    </div>
  );
}

export default Popup;
