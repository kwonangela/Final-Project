import { useState } from "react";
import "./CommentBox.css";
import { createComment } from "../../services/comments";
import { deletePost } from "../../services/posts.js";

function CommentBox({ postId, refresh, setRefresh }) {
  const [commentText, setCommentText] = useState("");
  const [deleteHelp, setDeleteHelp] = useState(
    new Audio("https://www.myinstants.com/media/sounds/y2mate_B59ZHvq.mp3")
  );

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (commentText.trim() === "") {
      return;
    }
    const newComment = {
      comment: commentText,
      post: postId,
      up_votes: 0,
      down_votes: 0,
      commenter: 1, // replace with the ID of the commenter if needed
    };
    try {
      const createdComment = await createComment(newComment);
      setCommentText("");
      setRefresh((prev) => !prev);
      // add code to update the UI with the new comment if needed
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  async function handleDelete() {
    deleteHelp.play();
    await deletePost(postId);
    setTimeout(() => {
      window.location.reload();
    }, "6000");
  }

  return (
    <form className="comment-form" onSubmit={handleCommentSubmit}>
      <button className="eliminate" onClick={handleDelete}>
        {" "}
        🗑️
      </button>
      <textarea
        className="comment-input"
        value={commentText}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
      />
      <button className="comment-submit" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CommentBox;
