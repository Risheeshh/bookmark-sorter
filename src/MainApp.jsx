import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookmarkSpace from './components/bookmarkSpace';
import SearchBar from './components/searchBar';
import LandingPage from './components/landingPage';
import SortedGenres from './components/sortedGenres';
import AddBookmark from './components/addBookmark';
import ProfileSidebar from './components/profile';

import bookmarksData from './assets/bookmarks.json';

export default function MainApp({ setIsAuthenticated }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [bookmarks, setBookmarks] = useState(bookmarksData);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const searchBarRef = useRef(null);

  const filteredBookmarks = bookmarks.filter(bookmark => 
    bookmark.name && bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.category && bookmark.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const handleAddBookmark = (newBookmark) => {
    setBookmarks((prevBookmarks) => {
      if (!prevBookmarks.some(bookmark => bookmark.name === newBookmark.name)) {
        return [...prevBookmarks, newBookmark];
      }
      return prevBookmarks;
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 text-white font-sans">
      {isSearchActive && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />}
      <header className="flex justify-between items-center p-6 bg-blue-900">
        <motion.h1 className="text-3xl font-bold font-extrabold text-center bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Bookmark Sorter
        </motion.h1>
        <nav>
          <ul className="flex space-x-6 text-lg list-none">
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/">Home</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/features">Features</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/about">About</Link>
            </motion.li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {/* Profile Icon */}
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="p-2 bg-white rounded-full shadow-md">
            <img src="/images/user.png" alt="Profile" className="w-10 h-10 rounded-full" />
          </button>

          {/* Logout Button */}
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
            Sign Out
          </button>
        </div>
      </header>

      <LandingPage />

      <section ref={searchBarRef} className="relative flex justify-center items-center py-6 px-4" id="target-section">
        <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg px-6 py-4 w-full max-w-4xl">
          <div className="flex-1">
            <SearchBar setSearchTerm={setSearchTerm} setIsSearchActive={setIsSearchActive} />
          </div>
          <div className="flex gap-2">
            <SortedGenres bookmarks={bookmarks} setSearchTerm={setSearchTerm} />
            <AddBookmark onAddBookmark={handleAddBookmark} />
          </div>
        </div>
      </section>

      <section id="bookmark-space" className="min-h-screen py-10">
        <BookmarkSpace bookmarks={filteredBookmarks} />
      </section>

      <footer className="bg-blue-950 py-6 text-center">
        <p>&copy; 2025 Bookmark Sorter. All rights reserved.</p>
      </footer>
      <ProfileSidebar isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
    </div>
  );
}
