import React from "react";
import { get } from "../services/service";
import { useParams } from "react-router-dom";
import Posts from "./Posts";
import defaultImage from "../assets/defaultImage.png";

const ViewProfile = () => {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [posts, setPosts] = React.useState([]);

  const params = useParams();

  React.useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await get(`/users/user-profile/${params.userId}`);
      console.log(response.data);
      setUser(response.data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await get(`/posts/user-posts/${params.userId}`);
      console.log(response.data);
      setPosts(response.data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  return user ? (
    <div className="view-profile">
      <img
        src={user.profilePic || defaultImage}
        alt="profile"
        height="200px"
        width="200px"
      />
      <h2>@{user.username}'s profile</h2>
      <h2>Posts</h2>
      {posts.map(function (post) {
        return (
          <div key={post._id}>
            <hr></hr>
            <p>{post.ticker}</p>
            <p>{post.content}</p>
            <p>{post.date}</p>
            <hr></hr>
          </div>
        );
      })}
    </div>
  ) : (
    <p>{status}</p>
  );
};

export default ViewProfile;
