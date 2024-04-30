import React, { useState, useEffect } from "react";
import "./EditPost.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import supabase from "../supabaseClient";

function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostById(postId);
  }, [postId]);

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

      setPost(data);
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("posts")
        .update([{ id: postId, title, content }]);

      if (error) {
        console.error("Error updating post:", error.message);
        return;
      }

      navigate(`/post/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  return (
    <div className="editpost">
      <div className="backfeedbutton"></div>
      <Link to="/feed">
        <button className="backfeed-button">Back to Feed</button>
      </Link>
      <h2>Edit Post</h2>
      {post && (
        <form onSubmit={handleSubmit}>
          <div className="input-section">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="textarea-section">
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="button-section">
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditPost;
