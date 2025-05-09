import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import LoginSignup from './components/LoginSignup';
import MainApp from './MainApp';
import About from './About';
import Stats from './components/userStats';
import Features from './features';
import Navbar from './components/navbar';
import SortedBookmark from './components/sortedBookmarks';
import Profile from './components/profile';

AOS.init();

export const UserContext = createContext(); // ✅ Create UserContext

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(""); // ✅ Store username globally

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, setUsername }}>
      <Router>
      
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/app" /> : <LoginSignup />} 
          />
          <Route 
            path="/app" 
            element={isAuthenticated ? <MainApp /> : <Navigate to="/" />} 
          />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/sorted-bookmark" element={<SortedBookmark />} />  
          <Route path="/profile" element={<Profile />} /> {/* ✅ Pass username to Profile */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}
