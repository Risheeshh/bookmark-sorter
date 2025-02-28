import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8">
      {/* Introduction Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4">About Bookmark Sorter</h1>
        <p className="text-lg text-gray-300">
          Bookmark Sorter is your ultimate tool for organizing and managing
          your favorite websites effortlessly. No more endless searching—save,
          categorize, and access your bookmarks with ease.
        </p>
      </div>

      {/* Team Section */}
      <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://source.unsplash.com/500x500/?team,work"
            alt="Team"
            className="rounded-lg shadow-md w-full"
          />
        </div>

        {/* Description Section */}
        <div className="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Meet the Team</h2>
          <p className="text-gray-300">
            We are a passionate group of developers dedicated to building
            innovative and user-friendly solutions. Our goal is to make web
            navigation seamless and efficient for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
