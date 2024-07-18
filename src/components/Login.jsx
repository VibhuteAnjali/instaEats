import { SignedOut, SignIn } from "@clerk/clerk-react";
import "../styles/Login.css";
export default function Login() {
  return (
    <div>
      <SignedOut>
        <SignIn className="signInForm" />
      </SignedOut>
    </div>
  );
}
