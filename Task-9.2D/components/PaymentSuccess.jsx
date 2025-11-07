import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import "../styling/PaymentSuccess.css";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const uid = searchParams.get("uid");

    async function activatePremium() {
      if (!uid) {
        setStatus("error");
        return;
      }

      try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, { isPremium: true });
        setStatus("success");

        setTimeout(() => {
          navigate("/home");
        }, 1000); 
      } catch (err) {
        console.error("Error updating user:", err);
        setStatus("error");
      }
    }

    activatePremium();
  }, [searchParams, navigate]);

  return (
    <div className="payment-success-container">
      {status === "success" && (
        <div className="success-section">
          <h1>Payment Successful</h1>
          <p className="subtext">
            You’ve unlocked <strong>Premium Access</strong>.
          </p>
          <ul className="features-list">
            <li>• Access to Code Editor in the Question Form</li>
            <li>• Ability to switch between Dark and Light Themes</li>
            <li>• Unlimited posting & image uploads</li>
          </ul>
          <p className="redirect-text">
            Redirecting you to <strong>Home</strong>...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="error-section">
          <h1>Something went wrong</h1>
          <p>We couldn’t activate your premium account. Please try again.</p>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;
