import React from "react";
import { get, post, remove } from "../services/service";
import { useParams, useNavigate } from "react-router-dom";
import defaultImage from "../assets/defaultImage.png";

const MyProfile = () => {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [posts, setPosts] = React.useState([]);

  const navigate = useNavigate();

  const profilePicture = localStorage.getItem("profilePicture");

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    fetchUser();
    fetchPosts();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await get(`/users/my-profile`);
      setUser(response.data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await get(`/posts/my-posts`);
      setPosts(response.data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await remove(`/posts/delete-post/${id}`);
      fetchPosts();
    } catch (err) {
      setStatus(err.message);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await remove(`/users/delete-user/${user._id}`);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      setStatus(err.message);
    }
  };

  return user ? (
    <div className="my-profile">
      <img
        src={profilePicture || defaultImage}
        alt="profile"
        height="200px"
        width="200px"
        className="roundImage"
      />

      <h2>My Profile</h2>
      <h2>@{user.username}</h2>
      <button onClick={deleteUser}>Delete Account</button>
      <h3>Posts</h3>
      {posts.map(function (post) {
        return (
          <div key={post._id}>
            <hr></hr>
            <p>{post.ticker}</p>
            <p>{post.content}</p>
            <p>{post.date}</p>
            <button onClick={() => deletePost(post._id)}>Delete Post</button>
            <hr></hr>
          </div>
        );
      })}
    </div>
  ) : (
    <p>{status}</p>
  );
};

export default MyProfile;
