import React from "react";
import App from "./App.jsx";
import "./index.css";

import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import Profile from "./components/Profile.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./components/Login.jsx";
import EditProfile from "./components/EditProfile.jsx";
import Search from "./components/Search.jsx";
import Createpost from "./components/Createpost.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import Createprofile from "./components/Createprofile.jsx";
import SavedPost from "./components/SavedPost.jsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/create-post",
        element: <Createpost />,
      },
      {
        path: "/create-profile",
        element: <Createprofile />,
      },
      {
        path: "/saved-post",
        element: <SavedPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
      }}
    >
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ClerkProvider>
  </React.StrictMode>
);
