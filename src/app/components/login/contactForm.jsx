import React, { useState } from "react";
import "./login.css";
import Axios from "axios";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/contact", {
      name,
      email,
      message,
    })
      .then((response) => {
        if (response.data.status === "success") {
          setSent(true);
        } else {
          setSent(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setSent(false);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="message">Message:</label>
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
      {sent ? (
        <div className="success-message">Message sent successfully!</div>
      ) : null}
    </div>
  );
};

export default ContactForm;
