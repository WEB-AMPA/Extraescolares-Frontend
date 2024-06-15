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
  const { login } = useAuthContext(); // Cambiado a `login` del contexto de autenticación
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch({"http://localhost:3000/api/login"}, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          const { token, role, name } = data;

          // Llamar a la función `login` del contexto para actualizar el estado de autenticación
          login(token, usernameOrEmail, name, role);

          // Redirigir a la página de intranet
          navigate("/intranet");
        } else {
          setError("Credenciales incorrectas. Por favor, verifica tus datos.");
        }
      } else {
        setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al verificar las credenciales", error);
      setError("Error al verificar las credenciales");
    }
    onResetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Usuario o Email</label>
            <input
              name="usernameOrEmail"
              id="usernameOrEmail"
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={usernameOrEmail}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              name="password"
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={onInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
