import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import bookmarksData from "../assets/bookmarks.json";

export default function SortedBookmarks() {
  const [sortedBookmarks, setSortedBookmarks] = useState({});

  useEffect(() => {
    // Group bookmarks by category
    const grouped = bookmarksData.reduce((acc, bookmark) => {
      if (!acc[bookmark.category]) {
        acc[bookmark.category] = [];
      }
      acc[bookmark.category].push(bookmark);
      return acc;
    }, {});

    setSortedBookmarks(grouped);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center gap-2 text-lg text-blue-400 mb-6"
      >
        <FaArrowLeft />
        <Link to="/">Back</Link>
      </motion.button>

      <h1 className="text-3xl font-bold mb-6 text-center">Sorted Bookmarks</h1>

      <div className="space-y-6">
        {Object.keys(sortedBookmarks).length > 0 ? (
          Object.entries(sortedBookmarks).map(([category, bookmarks]) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold mb-3">{category}</h2>
              <div className="flex gap-6 flex-wrap">
                {bookmarks.map((bookmark) => (
                  <motion.a
                    key={bookmark.name}
                    href={bookmark.description}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-gray-800 flex items-center justify-center rounded-lg shadow-lg"
                  >
                    <img src={bookmark.logo} alt={bookmark.name} className="w-10 h-10" />
                  </motion.a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No bookmarks found.</p>
        )}
      </div>
    </div>
  );
}
