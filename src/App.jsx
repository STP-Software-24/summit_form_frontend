import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThankYouPage from './component/ThankYouPage';
import RegistrationForm from "./component/RegistrationForm";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<RegistrationForm />} />
        <Route exact path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;