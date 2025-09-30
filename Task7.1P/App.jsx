import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  return (

    <Router>

      <AuthProvider>

        <Navbar />

        <Routes>
          <Route path="/" element={<div></div>} />  
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />

        </Routes>

      </AuthProvider>

    </Router>
  );
}

export default App;
