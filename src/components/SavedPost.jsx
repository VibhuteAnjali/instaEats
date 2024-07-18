import { useContext, useEffect, useState } from "react";
import { useGetProfile } from "../hooks/useProfile";
import Navbar from "./Navbar";
import Postbox from "./Postbox";
import Loader from "./Loader";
import { UserContext } from "../Context/UserContext";
import { usePosts } from "../hooks/usePosts";

export default function SavedPost() {
  const { email } = useContext(UserContext);
  const [postData, setPostData] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const { fetchPosts } = usePosts();
  console.log(email);
  const { profileData, loading, error } = useGetProfile(email);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingPosts(true);
      const results = [];
      console.log(profileData[0].savedPost, "saved");
      profileData[0].savedPost.forEach((postId) => {
        fetchPosts(postId).then((data) => results.push(data[0]));
      });
      console.log(results, "results");
      setIsLoadingPosts(false);
      setPostData(results);
    };

    fetchData();
  }, [profileData]);

  if (loading || isLoadingPosts) {
    return <Loader />;
  }
  if (error) {
    console.log(error);
  }
  return (
    <div>
      <Navbar />
      <div className="savedPost">
        <Postbox profileData={profileData} postData={postData} />
      </div>
    </div>
  );
}
