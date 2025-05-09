import React from 'react';
import Navbar from './components/navbar';

const FeaturesCarousel = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <Navbar />
      <div className="overflow-hidden w-full max-w-full">
        <h1 className="text-white text-4xl font-bold text-center mb-8">Features</h1>
        <div className="carousel flex animate-scroll hover:animate-pause">
          <div className="flex space-x-4">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">User  Management</h2>
              <p>Sign up, log in, and manage your profile effortlessly.</p>
            </div>
            <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">Bookmark Management</h2>
              <p>Easily add, view, and delete bookmarks.</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">Dynamic Search</h2>
              <p>Find your bookmarks quickly with our real-time search.</p>
            </div>
            <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">Responsive UI</h2>
              <p>Access your bookmarks on any device with a smooth interface.</p>
            </div>
            <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">Custom Categories</h2>
              <p>Organize bookmarks under custom categories for easy access.</p>
            </div>
            {/* Repeat items for infinite scrolling effect */}
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">User  Management</h2>
              <p>Sign up, log in, and manage your profile effortlessly.</p>
            </div>
            <div className="bg-purple-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">Bookmark Management</h2>
              <p>Easily add, view, and delete bookmarks.</p>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">Dynamic Search</h2>
              <p>Find your bookmarks quickly with our real-time search.</p>
            </div>
            <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">Responsive UI</h2>
              <p>Access your bookmarks on any device with a smooth interface.</p>
            </div>
            <div className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg flex-shrink-0 w-64">
              <h2 className="text-xl font-semibold">Custom Categories</h2>
              <p>Organize bookmarks under custom categories for easy access.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default FeaturesCarousel;