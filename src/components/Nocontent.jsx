/* eslint-disable react/prop-types */
// import React from "react";
import acc from "../components/icon/acc1.svg";
import "../styles/Nocontent.css";
import { Link } from "react-router-dom";
export default function Nocontent({ message }) {
  return (
    <div className="no-content">
      <img src={acc} alt="" />
      <p>{message}</p>
      <Link to="/" className="blackBtn">
        Create Account
      </Link>
    </div>
  );
}
