import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./createpost.css";
import { createPost } from "../../services/posts";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [img_url, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      title: title,
      text: text,
      img_url: img_url,
      up_votes: 0,
      down_votes: 0,
      user: 1,
      sub: 2,
    };
    try {
      await createPost(post);
      console.log("Post submitted successfully");
    } catch (error) {
      console.error("Error submitting the post: ", error);
    }
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <label htmlFor="title">Title:</label>
          <input
            required="required"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your post"
          />
        </div>
        <div className="inputbox">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={img_url}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter the URL for your post's image"
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Text:</label>
          <ReactQuill
            value={text}
            onChange={(value) => setText(value)}
            placeholder="Enter the text for your post"
          />
        </div>
        <div>
          <button type="submit">POST</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
