import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaBars } from "react-icons/fa";

const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <motion.div
        className="text-2xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="text-3xl">MemeVerse</Link>
      </motion.div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        <li>
          <Link to="/explore" className="hover:text-blue-500">
            Explore
          </Link>
        </li>
        <li>
          <Link to="/upload" className="hover:text-blue-500">
            Upload
          </Link>
        </li>
        <li>
          <Link to="/leaderboard" className="hover:text-blue-500">
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-blue-500">
            Profile
          </Link>
        </li>
      </ul>

      {/* Dark Mode & Mobile Menu Toggle */}
      <div className="flex items-center space-x-4">
        {/* <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button> */}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-xl focus:outline-none"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden">
          <ul className="flex flex-col items-center py-4 space-y-4">
            <li>
              <Link
                to="/explore"
                className="hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
