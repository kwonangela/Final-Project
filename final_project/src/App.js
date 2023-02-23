import Nav from "./components/navbar/Nav.jsx";
import Home from "./screens/home/Home.jsx";
import CreatePost from "./screens/createPost/CreatePost.jsx";
import Subreddit from "./screens/subreddit/Subreddit.jsx";
import SignUp from "./screens/signUp/SignUp.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/login/Login.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "./contexts/userContext.js";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(null);
  const [user, setUser] = useState(null);
  const isUserLoggedIn = () => {
    return !!user;
  };

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, isUserLoggedIn }}>
        <Router>
          <nav>
            <Nav />
          </nav>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/subs/:id" element={<Subreddit />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
