import React, { useState, useEffect } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

function Post({ post }) {
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    if (post) {
      setUpvotes(post.upvotes);
    }
  }, [post]);

  const handleUpvote = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .update({ upvotes: upvotes + 1 })
        .eq("id", post.id)
        .single();

      if (error) {
        console.error("Error updating upvotes:", error.message);
        return;
      }

      setUpvotes(data.upvotes);
    } catch (error) {
      console.error("Error updating upvotes:", error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const { error } = await supabase
          .from("posts")
          .delete()
          .eq("id", post.id);

        if (error) {
          console.error("Error deleting post:", error.message);
          return;
        }
      } catch (error) {
        console.error("Error deleting post:", error.message);
      }
    }
  };

  return (
    <div className="post">
      {post && (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Upvotes: {upvotes}</p>
          <button onClick={handleUpvote}>Upvote</button>
          <div className="delete-edit-section">
            <button className="edit-button">
              <Link to={`/edit/${post.id}`}>Edit</Link>
            </button>
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
          </div>
          <div className="back-button-section">
            <Link to="/feed">
              <button className="back-button">Back to Feed</button>
            </Link>
          </div>
        </>
      )}
      {!post && <div>Loading...</div>}
    </div>
  );
}

export default Post;
