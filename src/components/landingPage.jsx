import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <section className="relative min-h-screen bg-gradient-to-r from-blue-500 to-blue-900 text-white flex flex-col justify-center items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60" 
        style={{ backgroundImage: "url('/images/bg4.jpg')" }}
      />

      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Heading Animation */}
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Organize Your Bookmarks, Effortlessly
      </motion.h2>

      {/* Subheading Animation */}
      <motion.p
        className="text-lg md:text-xl text-center mt-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Simplify your browsing experience with custom categories and fast search.
      </motion.p>

      {/* Button Animation */}
      <motion.button
        className="bg-white text-blue-900 font-semibold py-3 px-6 rounded-lg shadow-lg mt-6 z-10 hover:bg-blue-100 hover:animate-pulse "
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, duration: 1 }}
        onClick={() => document.getElementById('target-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Get Started
      </motion.button>
    </section>
  );
}
