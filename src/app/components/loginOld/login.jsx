import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    // let dataUser = { credential: email, password: password };
    // const dt = await fetch("http://localhost:3010/login", {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(dataUser),
    //   mode: "cors"
    // });

    // const data = await dt.json();

    // console.log(data);
    axios
      .post("http://localhost:3010/login", {
        credential: email,
        password: password,
      })
      .then((response) => {
        // console.log(response.data);

        if (response.data) {
          navigate("/intranet");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="my-container">
      <section className="wrapper">
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Email o Número de socio "
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Contraseña"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Recuérdame
              </label>
              <Link to={"/forgotPassword"}>
                <a href="#">¿Olvidó su contraseña?</a>
              </Link>
            </div>
            <button type="submit">Iniciar Sesión</button>

            <div className="register-link">
              <p>
                ¿No tiene cuenta?{" "}
                <Link to={"/contactForm"}>
                  <a href="#">Click aquí</a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
