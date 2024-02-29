import React from 'react';
import Auth from './pages/Auth';
import {  Routes, Route,  } from 'react-router-dom';
import Home from './pages/home';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}

