import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-4">Oops! Looks like you're lost in the meme universe.</p>
      <img
        src="https://i.imgflip.com/4/30b1gx.jpg"
        alt="Meme Not Found"
        className="w-80 h-auto mb-4 rounded-lg shadow-lg"
      />
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
