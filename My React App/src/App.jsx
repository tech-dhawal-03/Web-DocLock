import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero_Page";
import "./index.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Error from "./components/Error";






export default function App() {



  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Hero />} />

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />

    



      </Routes>




    </>


  );
}

