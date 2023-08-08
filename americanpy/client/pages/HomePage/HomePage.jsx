import React from 'react';
import NavbarComponent from '../../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';


const HomePage = () => {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/country" element={<CountryPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </div>

  );
};


export default HomePage;
