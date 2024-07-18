/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useGetProfile, useUpdateProfile } from "../hooks/useProfile";
import "../styles/EditProfile.css";
import { useUpdateProfileImage } from "../hooks/useUpdateProfileImage";
import Loader from "./Loader";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { useDeleteProfile } from "../hooks/useProfile";

export default function EditProfile() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { email } = useContext(UserContext);
  const { profileData, loading } = useGetProfile(email);
  const [bio, setBio] = useState("");
  const [userName, setUsername] = useState("");
  const { message, error } = useUpdateProfileImage(email, image);
  const { updateProfile } = useUpdateProfile();
  const { deleteProfile } = useDeleteProfile();
  console.log(email, "profileData");
  async function HandleUpdate(e) {
    e.preventDefault();
    console.log(bio, userName);
    try {
      const res = await updateProfile(email, bio, userName);
      console.log(res);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  async function HandleDelete(e) {
    e.preventDefault();
    const profileId = profileData[0]._id;
    try {
      const res = await deleteProfile(profileId);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    console.log(error, "error");
  }
  return (
    <div>
      <div className="EditprofileInfo">
        <div className="profilepic">
          <img src={profileData[0].profilePic} alt="profileImg" />
          <input
            type="file"
            className="custom-file-input"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            disabled={image ? true : false}
          />
        </div>
        <form action="" method="post" className="editForm">
          <div className="box">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={userName}
              className="editInput h-3"
              placeholder={profileData[0].userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="box">
            <label>Bio</label>
            <textarea
              name="Bio"
              value={bio}
              className="editInput"
              rows="2"
              placeholder={profileData[0].Bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="buttons">
            <button className="blackBtn" onClick={HandleUpdate}>
              Save
            </button>
            <button className="blackBtn" onClick={HandleDelete}>
              Delete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
