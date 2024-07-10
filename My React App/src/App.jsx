import React from "react";
import Hero from "./components/Hero_Page";
import "./index.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Error from "./components/Error";
import Signup from "./components/Signup";
import CardHome from "./components/CardHome";

export default function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="login/login-successful" element={<CardHome/>} />
        <Route path="/logout-successful" element={<Hero/>} />
        <Route path="login-successful" element={<CardHome/>} />

        
      </Routes>
    </>
  );
}
