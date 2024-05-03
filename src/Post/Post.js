import React, { useState, useEffect } from "react";
import "./Post.css";
import { useParams, Link } from "react-router-dom";
import supabase from "../supabaseClient";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (error) {
          console.error("Error fetching post:", error.message);
          return;
        }

        setPost(data);
        setUpvotes(data?.upvotes || 0);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    fetchPost();
  }, [postId]);

  // If post is not yet fetched, return null to prevent rendering
  if (!post) {
    return null;
  }

  const handleUpvote = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .update({ upvotes: post.upvotes + 1 })
        .eq("id", postId)
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
        const { error } = await supabase.from("posts").delete().eq("id", postId);

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
      <>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <p>Upvotes: {upvotes}</p>
        <button onClick={handleUpvote}>Upvote</button>
        <div className="delete-edit-section">
          <button className="edit-button">Edit</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
        <div className="back-button-section">
          <Link to = '/feed'><button className="back-button">Back to Feed</button></Link>
        </div>
      </>
    </div>
  );
}

export default Post;
