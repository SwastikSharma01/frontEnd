import '../styles/Footer.css'
import facebook from '../assets/facebook.png'
import twitter from '../assets/twitter.png'
import insta from '../assets/insta.png'

function Footer() {
  return (
    <div className="footer">

      <div className="top">
        <section className='section1'>
          <h2>Explore</h2>
          <h3>Home</h3>
          <h3>Questions</h3>
          <h3>Articles</h3>
          <h3>Tutorials</h3>
        </section>

        <section className='section2'>
          <h2>Support</h2>
          <h3>FAQs</h3>
          <h3>Help</h3>
          <h3>Contact Us</h3>
        </section>

        <section className='section3'>
          <h2>Stay Connected</h2>
          <div className='icons'>
              <img className="imgs" src={facebook} alt="Facebook" />
              <img className="imgs" src={twitter} alt="Twitter" />
              <img className="imgs" src={insta} alt="Instagram" />
          </div>
        </section>
      </div>

      <div className="bottom">
        <h2 className="dev">DEV@Deakin 2025</h2>
        <div className="policies">
          <p>Privacy Policy</p>
          <p>Terms</p>
          <p>Code of Conduct</p>
        </div>
      </div>

    </div>
  );
}

export default Footer;
