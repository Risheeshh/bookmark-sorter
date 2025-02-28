import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App'; // ✅ Import context

const ProfileSidebar = ({ isOpen, setIsOpen }) => {
  const { username, setIsAuthenticated, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername(""); // Clear the username on logout
    navigate('/'); // Redirect to login/signup page
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 right-0 h-full w-80 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg p-6 text-white z-50"
    >
      <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-2xl">
        &times;
      </button>
      
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center mt-10">
        <img src="/images/user2.png" alt="Profile" className="w-20 h-20 rounded-full border-2 border-white" />
        <h2 className="mt-4 text-xl font-semibold">{username || "Loading..."}</h2>
        <p className="text-sm text-gray-300">user@example.com</p>
      </div>
      
      {/* Navigation Links */}
      <div className="mt-6 flex flex-col space-y-4">
        <Link to="/sorted-bookmark" className="block p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-center">
          Sorted Bookmarks
        </Link>
      </div>
      
      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-red-500 rounded hover:bg-red-700"
      >
        Sign Out
      </button>
    </motion.div>
  );
};

export default ProfileSidebar;
