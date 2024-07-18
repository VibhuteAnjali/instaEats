import Logo from "./sideComponents/Logo";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <Logo />
        <p>InstaEats</p>
      </div>
    </div>
  );
}
