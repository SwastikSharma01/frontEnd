import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../styling/Navbar.css";
import { useEffect, useState } from "react";

function Navbar({ isPremium }) {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

 function toggleTheme() {
  if (theme === "light") {
    setTheme("dark");  
  } else {
    setTheme("light"); 
  }
}


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="title">Posting App</h2>
      <ul className="links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/plans">Plans</Link></li>
        <li><Link to="/question">Post a Question</Link></li>
        <li><Link to="/article">Post an Article</Link></li>

       {isPremium && (
        <li>
          <button onClick={toggleTheme} className="theme-btn">
            {(() => {
              if (theme === "light") {
                return "Dark Mode";
              } else {
                return "Light Mode";
              }
            })()}
          </button>
        </li>
        )}
        
        <li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
