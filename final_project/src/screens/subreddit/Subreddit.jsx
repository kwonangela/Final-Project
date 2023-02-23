import { React, useEffect, useState } from "react";
import "./subreddit.css";
import Post from "../../components/posts/Post";
import PostModal from "../../components/posts/PostModal";
import { Link, useParams } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { getComments } from "../../services/comments";
import { getSub } from "../../services/subs";
import CreatePost from "../createPost/CreatePost";

export default function Subreddit({}) {
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [subTitle, setSubTitle] = useState([]);
  const [subDescription, setSubDescription] = useState([]);
  const [creator, setCreator] = useState([]);
  const [show, setShow] = useState(false);
  const [subID, setSubID] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [joinn, setJoinn] = useState(
    new Audio(
      "https://us-tuna-sounds-files.voicemod.net/36b12885-18d0-44ed-97ec-ff3e0956f211-1662757013368.mp3"
    )
  );
  const [postHelp, setPostHelp] = useState(
    new Audio("https://www.myinstants.com/media/sounds/ohyes.mp3")
  );
  let { id } = useParams();

  function openCreateModal() {
    postHelp.play();
    return setShow(true);
  }

  function closeCreateModal() {
    return setShow(false);
  }

  async function joinSubreddit() {
    if ("userID is included in follower list") {
      return <button id="join-button">Joined</button>;
    } else {
      return <button id="join-button">Join</button>;
    }
  }
  joinSubreddit();

  async function fetchSub() {
    const res = await getSub(id);
    const ids = res;
    setSubTitle(ids.title);
    setCreator(ids.creator);
    setSubDescription(ids.description);
    setSubID(ids.id);
  }

  useEffect(() => {
    fetchPosts();
    fetchSub();
  }, [id]);

  async function fetchPosts() {
    const allPosts = await getPosts();

    setPosts(
      allPosts.filter((post) => {
        return post.sub == id;
      })
    );
  }

  useEffect(() => {
    const fetchComment = async () => {
      const response = await getComments();
      setComments(response);
    };

    fetchComment();
  }, [refresh]);

  function joinIt() {
    joinn.play();
  }

  return (
    <div className="home-page-main-container">
      <div id="subreddit-header">
        <img
          id="user-avatar"
          src="https://icon-library.com/images/generic-user-icon/generic-user-icon-10.jpg"
          alt="user avatar"
        ></img>
        <div id="title-subLink-join">
          <h1 id="sub-title">{subTitle}</h1>
          <Link to="/subs/:id" id="sub-link">
            r/{subTitle}
          </Link>
        </div>
        <button id="join-button" onClick={joinIt}>
          Join
        </button>
        <p id="subreddit-description">{subDescription}</p>

        {show === true ? (
          <div className="create-buttons">
            <CreatePost subID={subID} />
            <button
              className="new-post-button"
              id="close-post"
              onClick={closeCreateModal}
            >
              Close
            </button>
          </div>
        ) : (
          <button className="new-post-button" onClick={openCreateModal}>
            New Post
          </button>
        )}
      </div>
      <div className="sub-post">
        {posts.map((post) => (
          <Post
            key={post.id}
            setDisplayModal={setDisplayModal}
            setModalPost={setModalPost}
            post={post}
            comments={comments}
          />
        ))}

        <PostModal
          modalPost={modalPost}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          comments={comments}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
}
