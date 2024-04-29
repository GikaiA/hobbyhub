import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CreatePost.css";
import supabase from "../supabaseClient";

function CreatePost({ onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      // Upload image to Supabase storage
      let imageUrl = null;
      if (image) {
        const { data, error } = await supabase.storage
          .from("posts")
          .upload(`images/${image.name}`, image);

        if (error) {
          console.error("Error uploading image:", error.message);
          return;
        }

        imageUrl = data.Key;
      }

      // Insert the post into the database
      const { error: postError } = await supabase
        .from("posts")
        .insert([{ title, content, image_url: imageUrl }]);

      if (postError) {
        console.error("Error creating post:", postError.message);
        return;
      }

      // Clear the form fields after successful submission
      setTitle("");
      setContent("");
      setImage(null);

      // Notify the parent component to update the feed
      onUpdate();
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <div className="createpost">
      <div className="backfeed-section">
        <Link to="/feed">
          <button className="backfeed-button">Back to Feed</button>
        </Link>
      </div>
      <form className="createpost-form" onSubmit={handlePost}>
        <input
          className="title-field"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="textarea-section">
          <textarea
            placeholder="What's on your mind? (optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="post-button">
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
