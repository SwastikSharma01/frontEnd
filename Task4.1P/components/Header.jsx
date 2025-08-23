import "../styles/Header.css";

function Header() {
  return (
    <header className="header">

        <nav>

            <a href="#home">Home <span>|</span></a>
            <a href="#articles"> Articles <span>|</span></a>
            <a href="#tutorials"> Tutorials <span>|</span></a>
            <a href="#contact"> Contact Us</a>

        </nav>
    
    </header>
    
  );
}

export default Header;
