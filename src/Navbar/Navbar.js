import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="navbar">
      <ul>
        <li>
          <div className="navbar-title">
            <Link to="/">Home</Link>
          </div>
        </li>
        {user ? (
          <>
            <li>
              <div className="navbar-title">
                <Link to="/create-post">Create Post</Link>
              </div>
            </li>
            <li>
              <div className="navbar-title">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <div className="navbar-title">
                <Link to="/login">Login</Link>
              </div>
            </li>
            <li>
              <div className="navbar-title">
                <Link to="/register">Sign Up</Link>
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
