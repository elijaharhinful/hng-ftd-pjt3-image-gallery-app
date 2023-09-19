import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/gallery" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
