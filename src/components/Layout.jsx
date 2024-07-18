import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx"; // Adjust the import according to your file structure
import "../styles/Layout.css";
const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
