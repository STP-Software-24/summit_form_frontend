import React from 'react';
import "./ThankYouPage.css"

const ThankYouPage = () => {
  return (
    <>
      <div className="thank-you flex-column justify-content-center">
      <div>
      <div className="m-4 d-block d-md-inline ">
          <img src="/img/logo.svg" className=" m-0 mx-auto d-block d-md-inline-block " alt="" />
        </div>
      <div className="m-4 d-block d-md-inline ">
        <img src="/img/mac_logo.svg" alt="mac logo" className="img-fluid d-inline" />
      </div>
      </div>
        <div className="message">
          <h2 className='white-text'>Thanks for Applying!</h2>
          <p>Join this <a href="https://chat.whatsapp.com/LcyvQsu51p79jXAOP7m5x0">WhatsApp Group</a>.</p>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;