import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="searchbar">
      <label htmlFor="search">DEV@Deakin</label>
      <input type="text" id="search" placeholder="Search..." />
      <button>Post</button>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default Navbar;


