import React from "react";
import LoginForm from "../../components/Web/login/LoginForm.jsx";
import Navbar from "../../components/Web/navbar/Navbar.jsx";
import Footer from "../../components/Web/footer/Footer.jsx";

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <LoginForm />
      <Footer/>
    </div>
  );
};

export default LoginPage;
