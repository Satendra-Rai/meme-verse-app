import React, { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Leaderboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [topMemes, setTopMemes] = useState([]);
  const [sortedMemes, setSortedMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        const memes = response.data.data.memes;

        // Sort memes by `box_count` in increasing order
        const sortedByBoxCount = [...memes].sort(
          (a, b) => a.box_count - b.box_count
        );
        setSortedMemes(sortedByBoxCount.slice(-10)); // Show last 10 memes

        // Fetch leaderboard data from localStorage
        const storedMemes =
          JSON.parse(localStorage.getItem("uploadedMemes")) || [];
        const memeLikes = storedMemes.map((meme) => ({
          url: meme,
          likes: parseInt(localStorage.getItem(`likes-${meme}`)) || 0,
        }));

        // Sort memes by likes and select top 10
        const sortedByLikes = memeLikes
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 10);
        setTopMemes(sortedByLikes);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>

        {/* Top 10 Most Liked Memes */}
        <h2 className="text-2xl font-semibold mb-4">
          🔥 Top 10 Most Liked Memes
        </h2>

        {/* Last 10 Memes Sorted by `box_count` */}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {sortedMemes.length > 0 ? (
            sortedMemes.map((meme, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={meme.url}
                  alt={`Meme ${index + 1}`}
                  className="w-full rounded-lg"
                />
                <p className="mt-2 font-bold">🖼️ Total Likes: {meme.box_count}</p>
              </motion.div>
            ))
          ) : (
            <p>No memes available.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
