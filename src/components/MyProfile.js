import React from "react";
import { get, post, remove } from "../services/service";
import { useParams, useNavigate } from "react-router-dom";
import defaultImage from "../assets/defaultImage.png";

const MyProfile = () => {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [posts, setPosts] = React.useState([]);

  const navigate = useNavigate();

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
      //   console.log(response);
      setUser(response.data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await get(`/posts/my-posts`);
      console.log(response.data);
      setPosts(response.data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await remove(`/posts/delete-post/${id}`);
      //   console.log(response.data);
      fetchPosts();
    } catch (err) {
      setStatus(err.message);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await remove(`/users/delete-user/${user._id}`);
      //   console.log(response.data);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      setStatus(err.message);
    }
  };
  user && console.log(user._id);

  return user ? (
    <div>
      {localStorage.getItem("profilePicture") ? (
        <img src={user.profilePic} height="200px" alt="profile" />
      ) : (
        <img src={defaultImage} height="200px" alt="profile" />
      )}

      <h2>{user.username}'s Profile</h2>
      <button onClick={deleteUser}>Delete Account</button>
      <h3>Posts</h3>
      {posts.map(function (post) {
        return (
          <div key={post._id}>
            <p>{post.ticker}</p>
            <p>{post.content}</p>
            <p>{post.date}</p>
            <button onClick={() => deletePost(post._id)}>Delete Post</button>
          </div>
        );
      })}
    </div>
  ) : (
    <p>{status}</p>
  );
};

export default MyProfile;
