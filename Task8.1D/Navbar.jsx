import { Link } from "react-router-dom";
import "../styling/Navbar.css"; 

function Navbar() {
  return (

    <nav className="navbar">

      <h2 className="title">Posting App</h2>

      <ul className="links">
        <li><Link to="/"> Home </Link></li>
        <li><Link to="/question">  Post a Question </Link></li>
        <li><Link to="/article"> Post an Article </Link></li>
      </ul>

    </nav>

  );
}

export default Navbar;