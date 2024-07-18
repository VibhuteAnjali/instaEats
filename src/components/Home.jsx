import "../styles/Home.css";
import { usePosts } from "../hooks/usePosts";
import { useContext, useEffect, useState } from "react";
import { useGetProfile } from "../hooks/useProfile";

import Postbox from "./Postbox";
import Loader from "./Loader";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export default function Home() {
  const { loading, error, fetchAllPosts } = usePosts();
  const { email } = useContext(UserContext);
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate();
  const {
    profileData,
    loading: loading2,
    error: error2,
  } = useGetProfile(email);

  useEffect(() => {
    fetchAllPosts().then((data) => setPostData(data));
  }, []);
  if (loading || loading2) {
    return (
      <p>
        <Loader />
      </p>
    );
  }
  if (error || error2) {
    return <p>{error}</p>;
  }
  if (profileData.length == 0) {
    navigate("/create-profile");
  }
  return (
    <div className="home">
      <Navbar />
      <Postbox postData={postData} profileData={profileData} />
    </div>
  );
}
