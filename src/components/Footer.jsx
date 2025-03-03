import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md py-4 px-6 mt-8 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/explore" className="hover:text-blue-500">Explore</Link>
        <Link to="/upload" className="hover:text-blue-500">Upload</Link>
        <Link to="/leaderboard" className="hover:text-blue-500">Leaderboard</Link>
        <Link to="/profile" className="hover:text-blue-500">Profile</Link>
      </div>
      <p className="text-sm">&copy; {new Date().getFullYear()} MemeVerse. All rights reserved.</p>
    </footer>
  );
};

export default Footer;