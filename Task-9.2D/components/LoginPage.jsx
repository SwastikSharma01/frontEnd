import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styling/Login.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", email);
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err.code);

      if (err.code === "auth/user-not-found") {
        alert("No account found with this email. Redirecting to Sign Up...");
        navigate("/register");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Login failed. Check your credentials and try again.");
      }
    }
  };

  return (
    <div className="loginbackground">
      <div className="logincard">
        <h1>Login</h1>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login" type="submit">
            Log In
          </button>

          <button
            className="signup"
            type="button"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
  