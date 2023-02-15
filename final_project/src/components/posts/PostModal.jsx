import { useEffect, useRef, useState } from "react";
import "./post.css";
import { updatePost } from "../../services/posts";

function PostModal({modalPost, displayModal, setDisplayModal, comments}) {
  const body = document.querySelector("body");

  const handleClose = () => {
    setDisplayModal(false);
    body.classList.remove('freeze-body');
  };

  const [upVotes, setUpVotes] = useState(modalPost.up_votes);
  const [downVotes, setDownVotes] = useState(modalPost.down_votes);

  const handleUpVote = async () => {
    setUpVotes(prevUpVotes => prevUpVotes += 1);
    const updatedPost = { ...modalPost, up_vote: upVotes += 1 };
    try {
      const response = await updatePost(modalPost.id, updatedPost);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDownVote = async () => {
    setDownVotes(prevDownVotes => prevDownVotes += 1);
    const updatedPost = { ...modalPost, down_vote: downVotes += 1 };
    try {
      const response = await updatePost(modalPost.id, updatedPost);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  


  if (displayModal) {
    body.classList.add('freeze-body');
  }

  return (
    <div className={displayModal ? "post-modal" : 'hide-element'}>
      <div className="close-btn-container">
        <div className="modal-title">{modalPost.title}</div>
        <img className='modal-image' src={modalPost.img_url} />
        <div className="texts">
          <div dangerouslySetInnerHTML={{ __html: modalPost.text }} />
        </div>
        <div className="votes-container">
          <div id="votes-div">
            <div className="votes">{upVotes}</div>
            <button className="upvote-button" onClick={handleUpVote}>Upvote</button>
          </div>
          <div id="votes-div">
            <div className="votes2">{downVotes}</div>
            <button className="downvote-button" onClick={handleDownVote}>Downvote</button>
          </div>
        </div>
        <div className="comments-container">
          <div className="comments-scrollable">
            {comments.filter(comment => comment.post == modalPost.id).map(comment => (
              <p key={comment.id}>{comment.comment}</p>
            ))}
          </div>
        </div>
        <svg className="close-post-modal" onClick={handleClose}>
          <line x1='6' y1='30' x2='20' y2='10' stroke='#ffffff' strokeWidth='3' />
          <line x1='6' y1='10' x2='20' y2='30' stroke='#ffffff' strokeWidth='3' />
        </svg>
      </div>
    </div>
  );
}



export default PostModal;
