import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Firestore Database
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import axios from "axios";

const UserProfile = () => {
  const [profile, setProfile] = useState({ name: "", bio: "", profilePic: "" });
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
    fetchUploadedMemes();
    fetchLikedMemes();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const docRef = doc(db, "users", "guest");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchUploadedMemes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "memes"));
      const memeUrls = querySnapshot.docs.map((doc) => doc.data().url);
      setUploadedMemes(memeUrls);
    } catch (error) {
      console.error("Error fetching uploaded memes:", error);
    }
  };

  const fetchLikedMemes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "likes"));
      const likedMemeUrls = querySnapshot.docs.map((doc) => doc.data().url);
      setLikedMemes(likedMemeUrls);
    } catch (error) {
      console.error("Error fetching liked memes:", error);
    }
  };

  const handleProfileUpdate = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const saveProfileToFirestore = async () => {
    try {
      await setDoc(doc(db, "users", "guest"), profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("https://api.imgbb.com/1/upload?key=f1007a2f3cabfe9725b1ec44043e3468", formData);
      const imageUrl = response.data.data.url;
      setProfile((prevProfile) => ({ ...prevProfile, profilePic: imageUrl }));
      
      await setDoc(doc(db, "users", "guest"), { ...profile, profilePic: imageUrl });
      alert("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side - User Details */}
      <div className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>
        
        <img
          src={profile.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
        />
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="mt-4 p-2 text-sm"
        />
        <button
          onClick={handleImageUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 mt-2"
        >
          Upload Image
        </button>

        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileUpdate}
          className="w-full p-2 border rounded-md mt-4 text-center"
          placeholder="Enter your name"
        />
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleProfileUpdate}
          className="w-full p-2 border rounded-md mt-2 text-center"
          placeholder="Enter your bio"
        />
        <button
          onClick={saveProfileToFirestore}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 mt-2"
        >
          Save Profile
        </button>
      </div>

      {/* Right Side - Uploaded & Liked Memes */}
      <div className="flex flex-col">
        {/* Uploaded Memes Section */}
        <h2 className="text-2xl font-semibold text-center">Uploaded Memes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {uploadedMemes.length > 0 ? (
            uploadedMemes.map((meme, index) => (
              <img key={index} src={meme} alt="Uploaded Meme" className="w-full rounded-lg shadow-md" />
            ))
          ) : (
            <p className="text-center col-span-full">No uploaded memes yet.</p>
          )}
        </div>

        {/* Liked Memes Section */}
        <h2 className="text-2xl font-semibold mt-6 text-center">Liked Memes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {likedMemes.length > 0 ? (
            likedMemes.map((meme, index) => (
              <img key={index} src={meme} alt="Liked Meme" className="w-full rounded-lg shadow-md" />
            ))
          ) : (
            <p className="text-center col-span-full">No liked memes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
