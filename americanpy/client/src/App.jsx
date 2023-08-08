import React from "react";
import { Routes, Route } from "react-router-dom"; 
import {
  CountryPage,
  HomePage,
  JourneyPage,
  LoginPage,
  MemoriesPage,
  UserPage,
} from "../pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/country" element={<CountryPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
