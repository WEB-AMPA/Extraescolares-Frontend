import React from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const forgotPassword = () => {
  return (
    <div className="wrapper">
      <h1>Forgot password</h1>
      <Link to={"/login"}>
        <a href="">Click me</a>
      </Link>
    </div>
  );
};

export default forgotPassword;
