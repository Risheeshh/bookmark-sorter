import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AddBookmark from './AddBookmark';

const BookmarkSpace = ({ bookmarks: externalBookmarks }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [animatedTitle, setAnimatedTitle] = useState('Bookmark Space');

  // Fetch only if no bookmarks are passed from props
  useEffect(() => {
    if (!externalBookmarks) {
      fetch("http://localhost:5000/bookmarks")
        .then((res) => res.json())
        .then((data) => setBookmarks(data))
        .catch((err) => console.error("Failed to fetch bookmarks:", err));
    }
  }, [externalBookmarks]);

  // Title animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedTitle((prev) =>
        prev === 'Bookmark Space' ? '✨ Bookmark Space ✨' : 'Bookmark Space'
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const displayedBookmarks = externalBookmarks || bookmarks;

  return (
    <section id="bookmark-space" className="min-h-screen bg-gray-50 py-10 text-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-8 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {animatedTitle}
        </motion.h2>

        {/* Add Bookmark Button */}
        <div className="flex justify-center mb-8">
          <AddBookmark onAdd={(updater) => setBookmarks(updater)} />
        </div>

        {/* Bookmark Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayedBookmarks.length > 0 ? (
            displayedBookmarks.map((bookmark) => (
              <motion.div
                key={bookmark.id || bookmark.name}
                className="p-6 bg-white shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-300 border border-gray-300 hover:border-blue-400 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(bookmark.description, "_blank")}
              >
                <div className="flex flex-col items-center">
                  <motion.img
                    src={bookmark.logo}
                    alt={bookmark.name}
                    className="w-20 h-20 mb-4 rounded-full shadow-lg"
                    whileHover={{ rotate: 10 }}
                  />
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {bookmark.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {bookmark.description || "No description available"}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600">No bookmarks found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookmarkSpace;
