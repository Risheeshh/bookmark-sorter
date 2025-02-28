import React from 'react';

export default function SearchBar({ setSearchTerm, setIsSearchActive }) {
  return (
    <div
      className="flex justify-center items-center w-full"
      // onClick={() => setIsSearchActive(true)}
    >
      <input
        type="text"
        placeholder="Search your bookmarks..."
        className="w-full p-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
