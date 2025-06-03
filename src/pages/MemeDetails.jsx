import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMemeById, addLike, addComment } from "../redux/memeSlice";

const MemeDetails = () => {
  const { id } = useParams();
  console.log("id", id);
  const dispatch = useDispatch();
  const { selectedMeme, comments, loading, error } = useSelector(
    (state) => state.memes
  );
  const [newComment, setNewComment] = useState("");
  console.log("selected", selectedMeme);
  useEffect(() => {
    dispatch(fetchMemeById(id));
  }, [dispatch, id]);

  const handleLike = () => {
    dispatch(addLike(id));
  };

  const handleComment = () => {
    if (newComment.trim() === "") return;
    dispatch(addComment({ id, comment: newComment }));
    setNewComment("");
  };

  if (loading) return <p>Loading meme...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedMeme) return <p>Meme not found.</p>;
  
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">{selectedMeme.name}</h1>
      <img
        src={selectedMeme.url}
        alt={selectedMeme.name}
        className="w-full h-auto rounded-lg"
      />
      <div className="mt-4">
        <button
          onClick={handleLike}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          ❤️ {selectedMeme.box_count || 0}
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="mt-2">
          {comments[id]?.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <ul className="list-disc list-inside">
              {comments[id]?.map((comment, index) => (
                <li key={index} className="mt-1">
                  {comment}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleComment}
            className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeDetails;
