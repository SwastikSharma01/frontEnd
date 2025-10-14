import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import backImg from '../assets/Welcome.png'; 
import '../styles/HomePage.css';

export default function Home() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="homepage"
      style={{
        backgroundImage: `url(${backImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh", 
      }}
    >
      <div className="welcome">

        <h2>Welcome to Dev@Deakin</h2>
        <h3>Logged In: {currentUser.email}</h3>
        <button onClick={logout}>Logout</button>

      </div>
     
    </div>
  );
}
