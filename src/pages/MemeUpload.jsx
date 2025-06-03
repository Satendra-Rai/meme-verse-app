import React, { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../firebase"; // Import Firestore Database
import { collection, addDoc, getDocs } from "firebase/firestore";

const MemeUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedMemes, setUploadedMemes] = useState([]);

  const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
  
  // Load memes from Firestore on mount
  useEffect(() => {
    fetchUploadedMemes();
  }, []);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Upload Image to ImgBB and Store URL in Firestore
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      // Upload to ImgBB
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${API_KEY}`,
        formData
      );
      const imageUrl = response.data.data.url;

      // Store Image URL in Firestore
      await addDoc(collection(db, "memes"), { url: imageUrl });

      alert("Upload successful!");
      setUploadedMemes((prev) => [...prev, imageUrl]); // Update state

    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Fetch all uploaded memes from Firestore
  const fetchUploadedMemes = async () => {
    const querySnapshot = await getDocs(collection(db, "memes"));
    const memeUrls = querySnapshot.docs.map((doc) => doc.data().url);
    setUploadedMemes(memeUrls);
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Upload Your Meme</h1>
      
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
      {preview && <img src={preview} alt="Preview" className="w-64 mx-auto mb-4 rounded-lg" />}
      
      <button 
        onClick={handleUpload} 
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700"
      >
        {uploading ? "Uploading..." : "Upload Meme"}
      </button>

      <h2 className="text-2xl font-semibold mt-6">All Uploaded Memes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {uploadedMemes.length > 0 ? uploadedMemes.map((meme, index) => (
          <img key={index} src={meme} alt="Uploaded Meme" className="w-full rounded-lg" />
        )) : <p>No uploaded memes yet.</p>}
      </div>
    </div>
  );
};

export default MemeUpload;
