import React, { useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Navbar */}
      <nav className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md py-5 px-6 flex items-center justify-between">
        
        {/* Logo (always visible and left-aligned) */}
        <motion.div
          className="text-2xl font-bold z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-3xl">MemeVerse</Link>
        </motion.div>

        {/* Centered Desktop Menu */}
        <ul className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <li><Link to="/explore" className="hover:text-blue-500">Explore</Link></li>
          <li><Link to="/upload" className="hover:text-blue-500">Upload</Link></li>
          <li><Link to="/leaderboard" className="hover:text-blue-500">Leaderboard</Link></li>
          <li><Link to="/profile" className="hover:text-blue-500">Profile</Link></li>
        </ul>

        {/* Mobile Menu Toggle - always in same top-right spot */}
        <div className="md:hidden z-10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-xl focus:outline-none"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md md:hidden">
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li><Link to="/explore" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Explore</Link></li>
            <li><Link to="/upload" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Upload</Link></li>
            <li><Link to="/leaderboard" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Leaderboard</Link></li>
            <li><Link to="/profile" className="hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
