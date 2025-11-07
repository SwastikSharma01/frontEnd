import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/Register";
import Home from "./components/QuestionList";
import Navbar from "./components/Navbar";
import Plans from "./components/Plans";
import PaymentSuccess from "./components/PaymentSuccess";
import QuestionForm from "./components/QuestionForm";
import ArticleForm from "./components/ArticleForm";

function App() {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setIsPremium(userDoc.exists() && userDoc.data().isPremium);
      } else {
        setIsPremium(false);
      }

      setLoading(false);
    });

    return unsubscribe; 
  }, []);

  function PrivateRoute(element) {
    if (user) {
      return element; 
    } else {
      return <Navigate to="/login" />;
    }
    }


  return (
    <Router>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home" element={PrivateRoute(<><Navbar isPremium={isPremium} /><Home /></>)} />
        <Route path="/plans" element={PrivateRoute(<><Navbar isPremium={isPremium} /><Plans /></>)} />
        <Route path="/question" element={PrivateRoute(<><Navbar isPremium={isPremium} /><QuestionForm /></>)} />
        <Route path="/article" element={PrivateRoute(<><Navbar isPremium={isPremium} /><ArticleForm /></>)} />

        <Route path="/payment-success" element={<PaymentSuccess />} />

      </Routes>
    </Router>
  );
}

export default App;
