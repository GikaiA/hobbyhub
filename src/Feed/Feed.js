import React, { useState, useEffect } from "react";
import "./Feed.css";
import supabase from "../supabaseClient";
import { Link, useParams } from "react-router-dom";
import Post from "../Post/Post";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const { postId } = useParams(); 

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    } else {
      fetchPosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase.from("posts").select("*");

      if (error) {
        console.error("Error fetching posts:", error.message);
        return;
      }

      const sortedPosts = sortPostsByCriteria(data, sortBy);
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

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

      setPosts([data]); 
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };

  const sortPostsByCriteria = (posts, criteria) => {
    return posts.slice().sort((a, b) => {
      if (criteria === "created_at") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (criteria === "upvotes") {
        return b.upvotes - a.upvotes;
      }
      return 0;
    });
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
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
}

export default Feed;
