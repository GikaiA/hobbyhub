import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./EditPost.css";
import supabase from "../supabaseClient";

function EditPost() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Fetch post details when the component mounts
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      // Fetch post details from the database
      const { data, error } = await supabase.from("posts").select("*").eq("id", postId);

      if (error) {
        console.error("Error fetching post details:", error.message);
        return;
      }

      // Set the post details in state
      const post = data[0];
      setTitle(post.title);
      setContent(post.content);
    } catch (error) {
      console.error("Error fetching post details:", error.message);
    }
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      // Update the post in the database
      const { error } = await supabase
        .from("posts")
        .update({ title, content })
        .eq("id", postId);

      if (error) {
        console.error("Error editing post:", error.message);
        return;
      }
      
    } catch (error) {
      console.error("Error editing post:", error.message);
    }
  };

  return (
    <div className="editpost">
      <div className="backfeed-section">
        <Link to={`/post/${postId}`}>
          <button className="backfeed-button">Back to Post</button>
        </Link>
      </div>
      <form className="editpost-form" onSubmit={handleEditPost}>
        <input
          className="title-field"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="content-field"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="edit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;
