import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMemes } from "../redux/memeSlice";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Homepage = () => {
  const dispatch = useDispatch();
  const { memes, loading, error } = useSelector((state) => state.memes);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);
  const getRandomMemes = (memesArray) => {
    const shuffled = [...memesArray].sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, 10); // Pick the first 10 items
  };
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to MemeVerse</h1>
      <p className="mb-4">Explore trending memes and have fun!</p>
      {loading && <p>Loading memes...</p>}
      {error && <p>Error fetching memes: {error}</p>}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {getRandomMemes(memes).map((meme) => (
          <div
            key={meme.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => navigate(`/meme/${meme.id}`)}
          >
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-auto rounded-lg"
            />
            <p className="mt-2 font-semibold">{meme.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Homepage;
