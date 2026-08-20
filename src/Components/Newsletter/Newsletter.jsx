import { useState } from "react";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Please enter a valid email.");
      return;
    }

    setMessage("You're subscribed successfully!");
    setEmail("");
  };

  return (
    <section className="newsletter">
      <div className="newsletter-box">
        <h2>
          STAY UPTO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </h2>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="email-box">
            <span className="email-icon">✉</span>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit">Subscribe to Newsletter</button>
        </form>

        {message && <p className="newsletter-message">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;