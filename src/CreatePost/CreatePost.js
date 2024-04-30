import React, { useState } from "react";
import "./CreatePost.css";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../supabaseClient";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(""); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("posts").insert([
        { title, content, image_url: imageUrl }, 
      ]);

      if (error) {
        console.error("Error creating post:", error.message);
        return;
      }

      navigate("/feed");
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <div className="createpost">
      <Link to = '/feed'><button className="backfeed-button">
        Back to Feed
      </button></Link>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-section">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="External Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="textarea-section">
          <textarea
            placeholder="What's on your mind? (optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="button-section">
          <button type="submit" className="createpost-button">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
