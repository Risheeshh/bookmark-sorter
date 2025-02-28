import React, { useState, useRef, useEffect } from "react";

export default function SortedGenres({ bookmarks, setSearchTerm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dropdownRef = useRef(null);

  // Extract unique categories from bookmarks
  const categories = ["All", ...new Set(bookmarks.map((bookmark) => bookmark.category))];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm(category === "All" ? "" : category.toLowerCase()); // Show all bookmarks when "All" is selected
    setIsOpen(false); // Close dropdown after selection
  };

  // Toggle dropdown on button click
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {selectedCategory}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className="block w-full text-left px-4 py-2 hover:bg-blue-200"
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
