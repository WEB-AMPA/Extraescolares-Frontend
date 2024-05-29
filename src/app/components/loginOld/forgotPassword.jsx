import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

const forgotPassword = () => {
  const [email, setEmail] = useState(""); // Define email state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/forgot-password", {
        email,
      })
      .then((response) => {
        toast.success(
          response.data.message ||
            "Check your email for the password reset link",
          {
            onClose: () => navigate("/login"), // Navigate to login page after toast closes
          }
        );
        console.log(response.data);
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        toast.error(errorMessage || "An error occurred");
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1>Forgot password</h1>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <button type="submit">Send</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default forgotPassword;
