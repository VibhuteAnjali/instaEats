import "../styles/CreatePost.css";
import { useGetProfile } from "../hooks/useProfile";
import Uploader from "./Uploader";
import { useState, useContext } from "react";
import { useCreatePost } from "../hooks/usePosts";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { UserContext } from "../Context/UserContext";
import Nocontent from "./Nocontent";
import Navbar from "./Navbar";
export default function Createpost() {
  const { email } = useContext(UserContext);
  const { profileData, loading, error } = useGetProfile(email);
  const { createPost } = useCreatePost();
  const [placename, setPlacename] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }
  if (profileData.length == 0) {
    return <Nocontent message="Create Profile To start viewing content!" />;
  }

  const formData = {
    userName: profileData[0].userName,
    imageUrl: imageUrl,
    placeName: placename,
    googleMapUrl: googleMapUrl,
    likes: 0,
    date: new Date().toISOString(),
    profileId: profileData[0]._id,
    caption: caption,
    profilePic: profileData[0].profilePic,
    likeId: [],
    rating: rating,
  };
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    const data = createPost(formData);
    console.log(data, "data");
    if (data) {
      navigate("/");
    }
  }

  return (
    <div className="create-post">
      <Navbar />
      <h1>Create Post</h1>
      <form className="createPostForm">
        <Uploader setImageUrl={setImageUrl} />
        <div className="flex-cp">
          <input
            type="text"
            value={placename}
            className="input-cp"
            placeholder="Name of the Place"
            onChange={(e) => {
              setPlacename(e.target.value);
            }}
          />
          <input
            type="text"
            value={googleMapUrl}
            className="input-cp"
            placeholder="Google map Url (Please give the exact loaction url)"
            onChange={(e) => {
              setGoogleMapUrl(e.target.value);
            }}
          />
        </div>
        <div className="flex-cp">
          <input
            type="text"
            value={caption}
            className="input-cp"
            placeholder="Caption"
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <input
            type="Number"
            value={rating}
            className="input-cp"
            placeholder="Rating (Out Of 5)"
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
        </div>
        <button className="blackBtn" onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
