import React, { useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const ContactForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const navigate = useNavigate();

  const data = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name.toLowerCase()]: value });
  };

  const send = async (e) => {
    e.preventDefault();
    const { name, email, message } = userData;

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    };

    try {
      const res = await fetch(
        "https://react-contact-form-1dae3-default-rtdb.firebaseio.com/Messages.json",
        option
      );
      if (res.ok) {
        setUserData({ name: "", email: "", message: "" });
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/login");
        }, 5000); // 5 seconds
      } else {
        toast.error("Failed to send message. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form method="POST" onSubmit={send}>
          <h1>Contáctanos</h1>
          <p className="pcontact">Para registrarte como nuevo usuario</p>
          <div className="input-box">
            <input
              type="text"
              name="name"
              value={userData.name}
              placeholder="Ingresa tu nombre"
              required
              autoComplete="off"
              onChange={data}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              value={userData.email}
              autoComplete="off"
              onChange={data}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <textarea
              name="message"
              value={userData.message}
              placeholder="Ingresa tu mensaje"
              autoComplete="off"
              onChange={data}
            />
          </div>
          <button type="submit">Enviar Mensaje</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
