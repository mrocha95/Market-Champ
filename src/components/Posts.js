import React from "react";
import axios from "axios";
import { get, post } from "../services/service";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

function Posts(props) {
  const [content, setContent] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [comments, setComments] = React.useState([]);

  const navigate = useNavigate();

  //   const params = useParams();

  const create = async (e) => {
    e.preventDefault();
    try {
      if (content.length < 4) {
        setStatus("Please type something of actual merit");
      } else {
        let response = await post("/posts/create", {
          ticker: props.ticker,
          content: content,
          date: new Date().toLocaleString(),
        });
        console.log(response);
        navigate(`/stockchart/${props.ticker}`);
      }
    } catch (err) {
      setStatus("Something went wrong");
    }
  };

  const getComments = async () => {
    // console.log(props.ticker);
    let response = await get(`/posts/ticker-posts/${props.ticker}`);
    console.log(response.data);
    setComments(response.data);
  };

  React.useEffect(() => {
    if (props.ticker) {
      getComments();
    }
  }, [props.ticker]);

  return (
    <div className="Posts">
      <h1>Posts: {props.ticker}</h1>

      {localStorage.length !== 0 && (
        <form onSubmit={create}>
          <label>Create your post</label>
          <textarea
            columns={40}
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Create Post</button>
        </form>
      )}
      <p>{status}</p>

      {comments.length > 0 &&
        comments.map(function (comment) {
          return (
            <div key={comment._id}>
              <h3>{comment.creatorId.username}</h3>
              <p>{comment.content}</p>
              <p>{comment.date}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Posts;