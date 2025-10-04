import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuestionList from './components/QuestionList';
import QuestionForm from './components/QuestionForm';
import ArticleForm from './components/ArticleForm';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/question" element={<QuestionForm />} />
          <Route path="/article" element={<ArticleForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
