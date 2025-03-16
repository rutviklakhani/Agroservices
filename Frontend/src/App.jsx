import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import TrackOrder from './components/TrackOrder.jsx';
import VehicleRenting from './components/VehicleRenting';
import SeedsPage from './components/SeedsPage';
//import CropDisease from './components/CropDisease';

function App() {
  return (
    <AuthProvider> {/* Wrap Routes with AuthProvider */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="/vehicle-renting" element={<VehicleRenting />} />
      <Route path="/seeds" element={<SeedsPage />} />
      {/* <Route path="/crop-disease" element={<CropDisease />} /> */}
    </Routes>
  </AuthProvider>
  );
}

export default App;
