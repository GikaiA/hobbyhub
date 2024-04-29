import React, { useState, useEffect } from "react";
import "./Feed.css";
import supabase from "../supabaseClient";
import { Link, useParams } from "react-router-dom";
import Post from "../Post/Post";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("created_at"); // Default sort by created time
  const { postId } = useParams(); // Get postId from route params

  useEffect((fetchPosts) => {
    if (postId) {
      // Fetch a specific post if postId is provided
      fetchPostById(postId);
    } else {
      // Fetch all posts if no postId is provided
      fetchPosts();
    }
  }, [postId]); // Add postId to the dependency array


  const fetchPostById = async (id) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching post:", error.message);
        return;
      }

      setPosts([data]); // Set the single post as an array
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };


  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="feed">
      <h2>Feed</h2>
      <div className="search-field-section">
        <input type="text" className="search-field" placeholder="Search..." />
      </div>
      <div className="createpost-section">
        <Link to='/create'><button className="createpost-button">Create A Post</button></Link>
      </div>
      <div className="sort-controls">
        <label>
          Sort By:
          <select value={sortBy} onChange={handleSortChange}>
            <option value="created_at">Created Time</option>
            <option value="upvotes">Upvotes Count</option>
          </select>
        </label>
      </div>
      {posts.map((post) => (
        <Link key={post.id} to={`/post/${post.id}`} className="post-link">
          <Post post={post} /> {/* Render Post component */}
        </Link>
      ))}
    </div>
  );
}

export default Feed;
