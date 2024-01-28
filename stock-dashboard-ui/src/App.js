// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NotFound from './components/Error';

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/error" element={<NotFound />}/>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
