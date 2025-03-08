import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import TrackOrder from './components/TrackOrder.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/track-order" element={<TrackOrder />} />
    </Routes>
  );
}

export default App;
