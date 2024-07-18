import { useContext, useState } from "react";
import Uploader from "./Uploader";
import "../styles/CreateProfile.css";
import { UserContext } from "../Context/UserContext";
import { useCreateProfile } from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
export default function Createprofile() {
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const { name, email } = useContext(UserContext);
  console.log(name, email);
  const navigate = useNavigate();
  const { message, error, createProfile } = useCreateProfile();
  async function handleCreateProfile(e) {
    e.preventDefault();
    const profileRes = createProfile(name, email, bio, username, imageUrl);
    console.log(name, email, username, bio, imageUrl);
    console.log(profileRes);
    navigate("/profile");
  }
  if (message) {
    console.log(message);
  }
  if (error) {
    console.log(error);
  }
  return (
    <div className="create-profile">
      <Navbar />
      <div className="login-button">
        <p>Login to your Account </p>
        <button className="blackBtn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
      <h1 className="heading">Create Profile</h1>
      <form>
        <Uploader setImageUrl={setImageUrl} />
        <div className="flex-cp">
          <input
            type="text"
            value={username}
            className="input-cp"
            placeholder="UserName"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            value={bio}
            className="input-cp"
            placeholder="Bio"
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />
        </div>
        <button className="blackBtn" onClick={handleCreateProfile}>
          Save
        </button>
      </form>
    </div>
  );
}
