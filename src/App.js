import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import Feed from "./Feed/Feed";
import CreatePost from "./CreatePost/CreatePost";
import Post from "./Post/Post";
import EditPost from "./EditPost/EditPost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/edit/:postId" element={<EditPost/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
