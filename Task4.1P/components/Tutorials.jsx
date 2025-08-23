import reactLogo from '../assets/react.svg';
import '../styles/Tutorials.css';
import dsa1 from '../assets/DSA.png';
import vite from '../assets/vite.jpg';
import arduino from '../assets/arduino.png';

function Tutorials() {
  return (
    <div>
        <div className="articles">

        <article className='article1'>
          <img  className="images1" src={dsa1} alt="DSA" />
          <p>DSA Tutorial</p>
          <p>Description: This is a tutorial about Data Structures and Algorithms.</p>
          <p>-----------------</p>
          <p>Author: Mr. Saravjeet Singh</p>

        </article>

        <article className='article1'>
          <img className="images1" src={vite} alt="React Install" />
          <p>React Install Tutorial </p>
          <p>Description: This is a tutorial about React Installation via Vite.</p>
          <p>-----------------</p>
          <p>Author: Mr. Sunil Dhawan</p>

        </article>

        <article className='article1'>
          <img className="images1" src={arduino} alt="Arduino" />
          <p>Arduino Tutorial</p>
          <p>Description: This is a tutorial about Arduino programming.</p>
          <p>-----------------</p>
          <p>Author: Mr. Amit Kumar </p>

        </article>

      </div>

      <button className="btn">See all tutorials </button>

      <section className='subscribe'>

        <label htmlFor="email"> SIGN UP FOR DAILY INSIDER EMAIL: </label>
        <input type="email" id="email" placeholder='Enter your email to subscribe' />
        <button>Subscribe</button>

      </section>
      

    </div>
  );
}

export default Tutorials;
