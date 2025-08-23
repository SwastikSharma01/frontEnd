import reactLogo from '../assets/react.svg';
import '../styles/Articles.css';
import imagenew from '../assets/image2.png';
import image3 from '../assets/image3.png';

function Articles() {
  return (
    <div>
        <div className="articles">

        <article className='article'>
          <img  className="images" src={reactLogo} alt="React Logo" />
          <p>React Course</p>
          <p>Description: This is a course about React library.</p>
          <p>-----------------</p>
          <p>Author: Mr. Sunil Dhawan</p>
        </article>

        <article className='article'>
          <img className="images" src={imagenew} alt="Java Script" />
          <p>JavaScript Course</p>
          <p>Description: This is a course about Java Script.</p>
          <p>-----------------</p>
          <p>Author: Mrs. Meenakshi Malhotra</p>

        </article>

        <article className='article'>
          <img className="images" src={image3} alt="Java Script" />
          <p>C++ Course</p>
          <p>Description: This is a course about C++ language.</p>
          <p>-----------------</p>
          <p>Author: Mr. Saravjeet Singh </p>

        </article>

      </div>

      <button className="btn">See all articles </button>

    </div>
  );
}

export default Articles;
