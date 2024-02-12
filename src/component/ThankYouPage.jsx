import React from 'react';
import { Link } from 'react-router-dom';
import "./ThankYouPage.css"

const ThankYouPage = () => {
  return (
    <div className="thank-you">
      <div className="message">
        <h2 class='white-text'>Thank you for registering!</h2>
        <p>You have successfully submitted your registration.</p>
        <p>Join our WhatsApp group <a href="https://chat.whatsapp.com/LcyvQsu51p79jXAOP7m5x0">here</a>.</p>
        <Link to="/">Go back to registration</Link>
      </div>
    </div>
  );
};

export default ThankYouPage;