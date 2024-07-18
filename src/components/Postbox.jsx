import { useState } from "react";
import Map from "./icon/Map.jsx";

import { useAddLike } from "../hooks/usePosts";
import Save from "./icon/Save.jsx";
/* eslint-disable react/prop-types */
export default function Postbox({ postData, profileData }) {
  const { updateLike } = useAddLike();
  const [postIndex, setPostIndex] = useState(null);

  function handleColorChange(i, id) {
    setPostIndex(i);
    const data = updateLike(id, profileData[0]._id);
    console.log(data);
  }
  const handleSaveChange = (postId, isSaved) => {
    // Update the saved state in the profileData
    profileData[0].savedPost = isSaved
      ? [...profileData[0].savedPost, postId]
      : profileData[0].savedPost.filter((id) => id !== postId);
  };
  console.log(postData, "postData");
  return (
    <>
      <div className="posts">
        {postData.length > 0 ? (
          postData.map((post, i) => (
            <div className="post" key={post._id}>
              <div className="flex-post">
                <div className="profileInfo-header">
                  <img src={post.profilePic} alt="" className="postPP" />
                  <p>{post.userName || post.username}</p>
                </div>
                <div>
                  {profileData && (
                    <Save
                      postId={post._id}
                      profileId={profileData[0]._id}
                      saved={profileData[0].savedPost.includes(post._id)}
                      onSaveChange={handleSaveChange}
                    />
                  )}
                </div>
              </div>
              <img src={post.imageUrl} alt="post" className="Postimg" />
              <div className="flex-post-l">
                <img
                  width="40"
                  height="40"
                  src={`https://img.icons8.com/ios-filled/50/${
                    postIndex === i ||
                    post.likeId.includes(profileData[0]._id) == true
                      ? "ff1100"
                      : "ffffff"
                  }/like--v1.png`}
                  alt="like--v1"
                  onClick={() => handleColorChange(i, post._id)}
                />
              </div>
              <div className="postAbout">
                <div className="postInfo g-1">
                  <p>{post.userName || post.username} </p>
                  <p className="w-12">{post.caption}</p>
                </div>
                <div className="postInfo g-1">
                  <a href={post.googleMapUrl}>
                    <div className="postInfo">
                      <Map className="cursor" />
                      <p className="cursor">{post.placeName}</p>
                    </div>
                  </a>
                  <div className="postInfo g-0">
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/fluency/48/star--v1.png"
                      alt="star--v1"
                    />
                    <p>{post.rating}/5</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="white">No posts available.</div>
        )}
      </div>
    </>
  );
}
