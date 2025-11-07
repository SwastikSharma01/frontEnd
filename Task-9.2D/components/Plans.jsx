import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styling/Plans.css";

function Plans() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  async function handleUpgrade() {
    if (!currentUser) {
      alert("Please log in to upgrade your plan.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/.netlify/functions/createCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_1SOkFlDIqkiuezp3g2E4jE6Z",
          uid: currentUser.uid,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout session creation failed.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to start checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="plans">
      <h1>Pricing Plans</h1>
      <p>Choose the right plan according to your needs.</p>

      <div className="cards">
        <div className="free">
          <h2>Free</h2>
          <h3>$0<span>/month</span></h3>
          <p>Perfect for individual learners</p>
          <ul>
            <li>No code editor</li>
            <li>Light Theme only</li>
            <li>No image upload feature</li>
          </ul>
          <button className="btn">Get Started</button>
        </div>

        <div className="paid">
          <h2>Premium</h2>
          <h3>$99<span>/month</span></h3>
          <p>Perfect for teams & creators</p>
          <ul>
            <li>Code editor feature available</li>
            <li>Dark Mode and Light mode</li>
            <li>Image upload feature in article</li>
          </ul>
          <button className="btn" onClick={handleUpgrade} disabled={loading}>
            {loading ? "Redirecting..." : "Upgrade"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Plans;
