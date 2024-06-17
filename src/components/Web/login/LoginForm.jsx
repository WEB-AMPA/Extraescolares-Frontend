import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { useForm } from "../../../hooks/useForm";

const LoginForm = () => {
  const { usernameOrEmail, password, onInputChange, onResetForm } = useForm({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { login } = useAuthContext(); 
  const navigate = useNavigate();
  const { VITE_URL } = import.meta.env;

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    try {
      const response = await fetch(`${VITE_URL}/api/login/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Network response was not ok");
        return;
      }

      if (data.token) {
        const { token, role, name } = data;
        login(token, usernameOrEmail, name, role);
        navigate("/intranet");
      } else {
        setError("Credenciales incorrectas. Por favor, verifica tus datos.");
      }
    } catch (error) {
      console.error("Error al verificar las credenciales", error);
      setError("Credenciales incorrectas. Por favor, verifica tus datos.");
    }
    onResetForm();
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text">
          <h1 className="text-5xl font-bold">¡Bienvenida!</h1>
          <p className="py-6">Esperamos que te disfrutes tu visita</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Usuario o Email</span>
              </label>
              <input
                name="usernameOrEmail"
                id="usernameOrEmail"
                type="text"
                placeholder="Usuario o Email"
                className="input input-bordered"
                value={usernameOrEmail}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña"
                className="input input-bordered"
                value={password}
                onChange={onInputChange}
                required
              />
              <label className="label">
                <a href="/request-password-reset" className="label-text-alt link link-hover">¿Olvidaste tu contraseña?</a>
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Acepto los términos y condiciones</span>
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-primary" 
                  checked={termsAccepted} 
                  onChange={() => setTermsAccepted(!termsAccepted)} 
                />
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-lg">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
