import { Link } from "react-router-dom";
import SearchIcon from "./sideComponents/SearchIcon";
import HomeIcon from "./sideComponents/HomeIcon";
import Explore from "./sideComponents/Explore";
import Profile from "./sideComponents/Profile";
import "../styles/Sidebar.css";
import Logo from "./sideComponents/Logo";
import CreatePost from "./sideComponents/CreatePost";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Logo />
      <Link to="/" className="Tooltip" data-text="Home">
        <HomeIcon />
      </Link>
      <Link to="search" className="Tooltip" data-text="Search">
        <SearchIcon />
      </Link>

      <Link to="create-post" className="Tooltip" data-text="Create Post">
        <CreatePost />
      </Link>
      <Link to="profile" className="Tooltip" data-text="Profile">
        <Profile />
      </Link>
    </div>
  );
}
