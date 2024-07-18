/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { useDeletePost } from "../hooks/usePosts";
import "../styles/Posts.css";
import { useLoadScript } from "@react-google-maps/api";
import Loader from "./Loader";
export default function Posts({ posts, setLike }) {
  const { loading, error, fetchPosts } = usePosts();
  const { deletePost } = useDeletePost();
  const [postData, setPostData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [deleteBoxIndex, setDeleteBoxIndex] = useState("");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
  });

  async function handleDeletePost(deleteBoxIndex) {
    const data = deletePost(deleteBoxIndex);
    console.log(data);
    window.location.reload();
  }
  useEffect(() => {
    const fetchData = async () => {
      const results = [];
      for (const postId of posts) {
        const data = await fetchPosts(postId);
        if (data) {
          results.push(data);
        }
      }
      setPostData(results);
      console.log(results, "results");
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (postData.length > 0) {
      let totalLikes = 0;
      postData.forEach((post) => {
        totalLikes += post[0].likes;
      });
      setLike(totalLikes);
    }
  }, [postData, setLike]);
  if (loading || !isLoaded) {
    return (
      <p>
        <Loader />
      </p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="heading">
        <div>
          <p>Posts</p>
        </div>
      </div>

      <div className="posts">
        {postData.length > 0 ? (
          postData.map((post) => (
            <div className="post" key={post[0]._id}>
              <div className="flex-menuBox">
                <img src={post[0].imageUrl} alt="post" className="Postimg" />
                <div className="menu">
                  <div
                    className="menu"
                    onClick={() => {
                      setShowMenu((showMenu) => !showMenu);
                      setDeleteBoxIndex(post[0]._id);
                    }}
                  >
                    <img
                      width="25"
                      height="25"
                      src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/menu-2.png"
                      alt="menu-2"
                    />
                  </div>
                  {showMenu && deleteBoxIndex === post[0]._id && (
                    <div className="menuBtn">
                      <button
                        className="deleteBtn"
                        onClick={() => handleDeletePost(deleteBoxIndex)}
                      >
                        Delete Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flexPost">
                <div className="flexColumn-posts">
                  <p className="border">{post[0].caption}</p>
                  <div className="map">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="35"
                      height="35"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#48b564"
                        d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"
                      ></path>
                      <path
                        fill="#fcc60e"
                        d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"
                      ></path>
                      <path
                        fill="#2c85eb"
                        d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"
                      ></path>
                      <path
                        fill="#ed5748"
                        d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"
                      ></path>
                      <path
                        fill="#5695f6"
                        d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"
                      ></path>
                    </svg>
                    <p>{post[0].placeName}</p>
                  </div>
                </div>
                <div className="likes">
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/color/48/like--v3.png"
                    alt="like--v3"
                  />
                  <p>{post[0].likes}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="noPost">
            <p className="white">No posts to show!</p>
            <p>Create Post to view the here</p>
          </div>
        )}
      </div>
    </div>
  );
}
