//Not in use rn. Logic sorted in MainApp itself



import React from 'react';
import { motion } from 'framer-motion';

const BookmarkList = ({ bookmarks, searchTerm }) => {
  // Filter bookmarks based on name or tag
  console.log("Bookmarks:", bookmarks);
  console.log("Search Term:", searchTerm);

  const filteredBookmarks = bookmarks.filter(bookmark => 
    bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (bookmark.category?.toString().toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
  

  return (
    <motion.div 
      className="bookmark-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBookmarks.map((bookmark) => (
            <div 
              key={bookmark.id} 
              className="bookmark-card p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <img 
                src={bookmark.logo} 
                alt={bookmark.name} 
                className="bookmark-logo w-16 h-16 object-contain mb-4 mx-auto"
              />
              <h3 className="text-center text-xl font-semibold">{bookmark.name}</h3>
              <p className="text-center text-sm text-gray-500">{bookmark.category}</p> {/* Display tag */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No bookmarks found</p>
      )}
    </motion.div>
  );
};

export default BookmarkList;
