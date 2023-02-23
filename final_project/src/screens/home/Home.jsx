import { useState, useEffect } from "react";
import "./home.css";
import Post from "../../components/posts/Post.jsx";
import PostModal from "../../components/posts/PostModal";
import { getPosts } from "../../services/posts.js";
import { getComments } from "../../services/comments.js";
import { getNews } from "../../services/newsAPI.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [articles, setArticles] = useState([]);
  const [modalPost, setModalPost] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [sortPost, setSortPost] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await getPosts();
      if (sortPost === "likes") {
        setPosts(allPosts.sort((a, b) => b.up_votes - a.up_votes));
      } else if (sortPost === "dislikes") {
        setPosts(allPosts.sort((a, b) => b.down_votes - a.down_votes));
      } else {
        setPosts(allPosts);
      }
    };
    fetchPosts();
  }, [sortPost]);

  useEffect(() => {
    const fetchComment = async () => {
      const response = await getComments();
      setComments(response);
    };

    fetchComment();
  }, [refresh]);

  useEffect(() => {
    const newsAPI = async () => {
      const response = await getNews();
      setArticles(response.articles);
    };

    newsAPI();
  }, []);

  function sort() {
    setSortPost("likes");
  }
  function dislikes() {
    setSortPost("dislikes");
  }
  const [scrollInterval, setScrollInterval] = useState(null);

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const scrollLeft = document.querySelector(".scroll-left");
    const scrollRight = document.querySelector(".scroll-right");

    function handleScrollLeftEnter() {
      setScrollInterval(
        setInterval(() => {
          scrollContainer.scrollBy({ left: -20, behavior: "smooth" });
        }, 50)
      );
    }

    function handleScrollLeftLeave() {
      clearInterval(scrollInterval);
    }

    function handleScrollRightEnter() {
      setScrollInterval(
        setInterval(() => {
          scrollContainer.scrollBy({ left: 20, behavior: "smooth" });
        }, 50)
      );
    }

    function handleScrollRightLeave() {
      clearInterval(scrollInterval);
    }

    scrollLeft.addEventListener("mouseenter", handleScrollLeftEnter);
    scrollLeft.addEventListener("mouseleave", handleScrollLeftLeave);
    scrollRight.addEventListener("mouseenter", handleScrollRightEnter);
    scrollRight.addEventListener("mouseleave", handleScrollRightLeave);

    return () => {
      clearInterval(scrollInterval);
      scrollLeft.removeEventListener("mouseenter", handleScrollLeftEnter);
      scrollLeft.removeEventListener("mouseleave", handleScrollLeftLeave);
      scrollRight.removeEventListener("mouseenter", handleScrollRightEnter);
      scrollRight.removeEventListener("mouseleave", handleScrollRightLeave);
    };
  }, [scrollInterval]);

  return (
    <div className="home-page-main-container">
      <div className="news-feed-scroll-wrapper">
        <div className="news-feed-scroll" id="scroll-container">
          {articles.map((article) => (
            <div
              key={article.source.id}
              className="news-feed-container"
              style={{
                backgroundImage: `url("${article.urlToImage}")`,
              }}
            >
              <a
                className="news-anchor"
                href={article.url}
                target="blank"
                rel="noreferrer noopener"
              >
                <div className="news-feed-sub-container">
                  <h2 className="news-feed-title">
                    {article.title.length > 40
                      ? article.title.slice(0, 40) + "..."
                      : article.title}
                  </h2>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <div className="scroll-left">&#10094;</div>
          <div className="scroll-right">&#10095;</div>
        </div>
      </div>
      <div className="home-page-filter-container">
        <p className="filter-text"> Filter By:</p>
        <div id="filter-button">
          <button onClick={sort}> Likes 👍 </button>
          <button onClick={dislikes}> Not likes 👎 </button>
        </div>
      </div>
      <div className="home-page-post-container">
        {posts.map((post) => (
          <Post
            key={post.id}
            setDisplayModal={setDisplayModal}
            setModalPost={setModalPost}
            post={post}
            modalPost={modalPost}
            comments={comments}
          />
        ))}
      </div>
      <PostModal
        modalPost={modalPost}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        comments={comments}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </div>
  );
}
