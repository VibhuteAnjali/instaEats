import { Link } from "react-router-dom";
import "../styles/Profile.css";
import Posts from "./Posts";
import { useGetProfile } from "../hooks/useProfile";
import { useContext, useState } from "react";
import Loader from "./Loader";
import { UserContext } from "../Context/UserContext";
import Nocontent from "./Nocontent";
// import { useEffect } from "react";

export default function Profile() {
  const { email } = useContext(UserContext);
  const { profileData, loading, error } = useGetProfile(email);
  const [like, setLike] = useState(0);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!profileData || profileData.length == 0) {
    return <Nocontent message="Create Profile To start viewing content!" />;
  }

  return (
    <div className="profile">
      <div className="profileInfo">
        <div className="profileimg">
          <img src={profileData[0].profilePic} alt="profileImg" />
        </div>

        <div className="profilesetting">
          <div className="flex-profile">
            <p className="highlight"> {profileData[0].userName}</p>
            <div className="profile-button">
              <Link
                to="/saved-post"
                className="saved Tooltip2"
                data-text="Saved Post"
              >
                <img
                  width="35"
                  height="30"
                  src="https://img.icons8.com/ios-glyphs/30/FFFFFF/bookmark-ribbon.png"
                  alt="bookmark-ribbon"
                />
              </Link>
              <Link to="/edit-profile" className="blackBtn">
                Edit Profile
              </Link>
            </div>
          </div>
          <div className="flex-profile">
            <p className="info">{profileData[0].Posts.length} posts</p>
            <p className="info">{like} Likes</p>
          </div>
          <div className="profileAbout">
            <p className="username">{profileData[0].Name}</p>
            <p className="about">{profileData[0].Bio}</p>
          </div>
        </div>
      </div>
      <Posts posts={profileData[0].Posts} setLike={setLike} />
    </div>
  );
}
