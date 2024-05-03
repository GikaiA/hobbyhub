/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Feed.css";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const fetchPosts = async () => {
    try {
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .order(sortBy, { ascending: false });

      if (postsError) {
        console.error("Error fetching posts:", postsError.message);
        return;
      }

      const postsWithComments = await Promise.all(
        postsData.map(async (post) => {
          const { data: commentsData, error: commentsError } = await supabase
            .from("comments")
            .select("*")
            .eq("post_id", post.id);

          if (commentsError) {
            console.error(
              "Error fetching comments for post:",
              commentsError.message
            );
            return post;
          }

          return { ...post, comments: commentsData };
        })
      );

      setPosts(postsWithComments);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleCommentSubmit = async (postId) => {
    try {
      const { data, error } = await supabase.from("comments").insert({
        post_id: postId,
        text: commentText,
      });

      if (error) {
        console.error("Error adding comment:", error.message);
        return;
      }

      setCommentText(""); // Clear comment input after submission
      // Refresh posts after comment submission
      fetchPosts();
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <div className="feed">
      <h2>Feed</h2>
      <div className="createpost-section">
        <Link to="/create">
          <button className="createpost-button">Create A Post</button>
        </Link>
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
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Upvotes: {post.upvotes}</p>
          <div className="comments">
            <h4>Comments:</h4>
            {post.comments &&
              post.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.text}</p>
                </div>
              ))}
          </div>
          <form
            className="comment-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleCommentSubmit(post.id);
            }}
          >
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              required
            />
            <button type="submit">Comment</button>
          </form>
          <div className="post-buttons">
            <button className="edit-button">
              <Link to={`/edit/${post.id}`}>Edit</Link>
            </button>
            <button className="delete-button">
              <Link to={`/delete/${post.id}`}>Delete</Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
