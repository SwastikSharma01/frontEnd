import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import BackImg from '../assets/background.jpg';
import "../styles/RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match!");
    try {
      await signup(email, password, name);
      alert("Account created!");
      navigate("/login");
    } catch (err) {
      alert("Signup error: " + err.message);
    }
  };

  return (
    <div className="Registerbackground" style={{ backgroundImage: `url(${BackImg})` }}>
      <div className="Registercard">
        <h1>Create a Dev@Deakin Account</h1>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
export default RegisterPage;
