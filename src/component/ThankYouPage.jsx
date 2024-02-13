import React from 'react';
import { Link } from 'react-router-dom';
import "./ThankYouPage.css"

const ThankYouPage = () => {
  return (
    <div className="thank-you">
      <div className="message">
        <h2 className='white-text'>Thanks for Applying!</h2>
        <p>Join this <a href="https://chat.whatsapp.com/LcyvQsu51p79jXAOP7m5x0">WhatsApp Group</a>.</p>
      </div>
    </div>
  );
};
//<Link to="/">Go back to registration</Link>

export default ThankYouPage;