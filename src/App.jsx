import "./App.css";
import { useAuth } from "@clerk/clerk-react";
import Home from "./components/Home";
import Loader from "./components/Loader";
import { useNavigate } from "react-router-dom";
function App() {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  if (!isLoaded) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (!isSignedIn) {
    navigate("/Login");
  }
  return (
    <div className="main-body">
      <Home />
    </div>
  );
}

export default App;
