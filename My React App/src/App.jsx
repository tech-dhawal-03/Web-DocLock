import React from "react";
import Hero from "./components/Hero_Page";
import "./index.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Signup from "./components/Signup";
import CardHome from "./components/CardHome";
import CardHelp from "./components/CardHelp";
import CardDocument from "./components/CardDocument";
import CardPassword from "./components/CardPassword";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cardprofile" element={<CardHome/>} />
        <Route path="/logout-successful" element={<Hero/>} />
        <Route path="/cardhelp" element={<CardHelp />} />
        <Route path="/cardprofile" element={<CardHome />} />
        <Route path="/carddocument" element={<CardDocument/>} />
        <Route path="/cardpassword" element={<CardPassword />} />        
      </Routes>
    </>
  );
}
