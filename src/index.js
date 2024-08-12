import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import Things from './Pages/Things';
import Packages from './Pages/Packages';
import Stays from './Pages/Stays';
import MultiCity from './Pages/MultiCity';
import OneWay from './Pages/OneWay';
import RoundTrip from './Pages/RoundTrip';
import Search from './Pages/Search';
import Favorites from './Pages/Favorites';
import Trips from './Pages/Trips';
import SearchStay from './Pages/SearchStay';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/stays" element={<Stays />} />
        <Route path="/flights/round" element={<RoundTrip />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/things" element={<Things />} />
        <Route path="/flights/multi" element={<MultiCity />} />
        <Route path="/flights/oneway" element={<OneWay />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/search-stays" element={<SearchStay />} />
      </Routes>
    </Router>
  </AuthProvider>
);