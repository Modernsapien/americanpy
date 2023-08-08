import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from '../components/Navbar';
import { CountryPage, HomePage, JourneyPage, LoginPage, MemoriesPage, UserPage } from '../pages';

function App() {
  return (
      <NavbarComponent />  
  );
}

export default App;
