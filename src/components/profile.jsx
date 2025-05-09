import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const ProfileSidebar = ({ isOpen, setIsOpen }) => {
  const { username, setIsAuthenticated, setUsername } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState('/images/user2.png');
  const [email, setEmail] = useState('user@example.com');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed top-0 right-0 h-full w-80 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg p-6 text-white z-50"
    >
      <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-2xl">
        &times;
      </button>

      {/* Profile Section */}
      <div className="flex flex-col items-center text-center mt-10">
        <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full border-2 border-white object-cover" />
        <h2 className="mt-4 text-xl font-semibold">{username || 'Loading...'}</h2>
        <p className="text-sm text-gray-300">{email}</p>

        {/* Edit Profile Toggle */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 text-sm text-blue-300 hover:underline"
        >
          {isEditing ? 'Close Edit Profile' : 'Edit Profile'}
        </button>

        {/* Edit Form */}
        {isEditing && (
          <div className="mt-4 w-full text-left space-y-3 text-sm">
            <div>
              <label className="block mb-1 text-gray-300">Email:</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-300">Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-gray-200"
              />
            </div>
          </div>
        )}
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
