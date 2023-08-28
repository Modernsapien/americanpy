import React from "react";
import { Routes, Route } from "react-router-dom"; 
import {
  HomePage,
  MapPage,
  JourneyPage,
  LoginPage,
  MemoriesPage,
  UserPage,
} from "../pages";
import NavbarComponent from ".././components/Navbar";
import { PointsProvider } from "../components/MemoriesComponents/PointsContext";
import ComponentUsingPoints from "../components/MemoriesComponents/ComponentUsingPoints";
import ProtectedRoute from "../pages/protectedRoute/protectedRoute";


function App() {
  return (
    <>
    <PointsProvider>
      <ComponentUsingPoints />
      <NavbarComponent /> 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<ProtectedRoute redirectTo="/login" />}>
        <Route path="/mappage" element={<MapPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/user" element={<UserPage />} />
        </Route>
      </Routes>
      </PointsProvider>
    </>
  );
}

export default App;
