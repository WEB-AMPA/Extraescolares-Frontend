import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/authContext.jsx'; // Ajusta la ruta según tu estructura de proyecto

const LoginForm = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernameOrEmail, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          const { role } = data;

          // Almacenar información del usuario en sessionStorage
          sessionStorage.setItem('usernameOrEmail', usernameOrEmail);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('token', data.token);

          setAuth({
            isAuth: true,
            token: data.token,
            user: usernameOrEmail,
            role,
          });

          // Redirigir a la página de intranet
          navigate('/intranet');
        } else {
          setError('Credenciales incorrectas. Por favor, verifica tus datos.');
        }
      } else {
        setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al verificar las credenciales', error);
      setError('Error al verificar las credenciales');
    }
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
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
