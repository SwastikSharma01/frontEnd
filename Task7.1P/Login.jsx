import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import BackImg from '../assets/background.jpg';
import "../styles/Login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // 
    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div
      className="loginbackground"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="logincard">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login" type="submit">Log In</button>
          <button className="signup" onClick={() => navigate("/register")}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
