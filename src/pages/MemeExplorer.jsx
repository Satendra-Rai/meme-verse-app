import React, { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

const MemeExplorer = () => {
  const [memes, setMemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        setMemes(response.data.data.memes);
        setFilteredMemes(response.data.data.memes);
      })
      .catch((error) => console.error("Error fetching memes:", error));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredMemes(
        memes.filter((meme) =>
          meme.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, memes]);

  useEffect(() => {
    fetchLikedMemes();
  }, []);

  // Fetch liked memes from Firestore
  const fetchLikedMemes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "likes"));
      const likedSet = new Set(querySnapshot.docs.map((doc) => doc.id));
      setLikedMemes(likedSet);
    } catch (error) {
      console.error("Error fetching liked memes:", error);
    }
  };

  // Handle like and save to Firestore
  const handleLike = async (meme) => {
    if (likedMemes.has(meme.id)) {
      // Dislike (Unlike) functionality: Remove from Firestore
      await handleDislike(meme);
    } else {
      try {
        await setDoc(doc(db, "likes", meme.id), {
          url: meme.url,
          liked: true,
        });
        setLikedMemes(new Set([...likedMemes, meme.id])); // Update local state
      } catch (error) {
        console.error("Error saving like:", error);
      }
    }
  };

  // Handle dislike (unlike) and remove from Firestore
  const handleDislike = async (meme) => {
    try {
      await deleteDoc(doc(db, "likes", meme.id));
      const updatedLikedMemes = new Set(likedMemes);
      updatedLikedMemes.delete(meme.id);
      setLikedMemes(updatedLikedMemes);
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Explore Memes</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search memes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-6 border rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:outline-none"
        />

        {/* Meme Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {filteredMemes.map((meme) => (
            <motion.div
              key={meme.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-auto rounded-lg cursor-pointer"
                onClick={() => navigate(`/meme/${meme.id}`)}
              />
              <p className="mt-2 font-semibold">{meme.name}</p>

              {/* Like & Dislike Button */}
              <button
                onClick={() => handleLike(meme)}
                className={`mt-3 px-5 py-2 text-white rounded-lg shadow-md transition-transform ${
                  likedMemes.has(meme.id)
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
              >
                {likedMemes.has(meme.id) ? "❤️ Liked" : "🤍 Like"}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MemeExplorer;
