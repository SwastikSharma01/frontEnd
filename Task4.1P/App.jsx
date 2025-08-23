import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import image18 from './assets/image1.png'
import './App.css'
import Header from './components/Header.jsx';
import Searchbar from './components/Searchbar.jsx';
import Articles from './components/Articles.jsx'
import Tutorials from './components/Tutorials.jsx'
import Footer from './components/Footer.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div >

        <Header />

        <Searchbar />

        <img src={image18} alt="Deakin" />

        <h1> Featured Articles </h1>

        <Articles />

        <h1> Featured Tutorials </h1>

        <Tutorials />

        <Footer />

      </div>


    </>
  )
}
export default App
