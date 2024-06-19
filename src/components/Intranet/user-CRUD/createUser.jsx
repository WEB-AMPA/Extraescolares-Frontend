import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    roleName: '',
    lastname: '',
    name: '',
    phone_number: '',
    partner_number: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { VITE_URL } = import.meta.env;
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'partner_number' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = { ...formData };
    if (formData.roleName !== 'partner') {
      delete dataToSubmit.phone_number;
      delete dataToSubmit.partner_number;
    }

    try {
      const response = await axios.post(`${VITE_URL}/api/users`, dataToSubmit, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setSubmitted(true);
      setFormData({
        username: '',
        email: '',
        roleName: '',
        lastname: '',
        name: '',
        phone_number: '',
        partner_number: ''
      });
      setErrors({});
      console.log(response.data);
      
    } catch (error) {
      setSubmitted(false);
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data);
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: error.response.data.message || 'Error creando el usuario' });
        }
      } else {
        setErrors({ general: 'Error creando el usuario' });
      }
    }
  };

  const handleCancel = () => {
    navigate("/intranet");
  };

  const { roleName } = formData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="relative max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg">
      
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Crear un Usuario</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Nombre de Usuario:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label htmlFor="roleName" className="block text-gray-700 font-medium mb-2">Rol:</label>
            <select id="roleName" name="roleName" value={formData.roleName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione Rol</option>
              <option value="coordinator">Coordinador</option>
              <option value="partner">Socio</option>
              <option value="admin">Admin</option>
              <option value="monitor">Monitor</option>
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label htmlFor="lastname" className="block text-gray-700 font-medium mb-2">Apellido:</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          {roleName === 'partner' && (
            <>
              <div>
                <label htmlFor="phone_number" className="block text-gray-700 font-medium mb-2">Número de Teléfono:</label>
                <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required={roleName === 'partner'} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label htmlFor="partner_number" className="block text-gray-700 font-medium mb-2">Número de Socio:</label>
                <input type="text" id="partner_number" name="partner_number" value={formData.partner_number} onChange={handleChange} required={roleName === 'partner'} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={handleCancel} className="py-2 px-4 bg-gray-400 text-white font-bold rounded-full hover:bg-gray-500 transition duration-300">Cancelar</button>
          <button type="submit" className="py-2 px-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300">Guardar</button>
        </div>
        {submitted && <p className="text-green-500 mt-4 text-center">¡Usuario creado exitosamente!</p>}
        {errors && Object.keys(errors).map((key) => <p key={key} className="text-red-500 text-center mt-2">{errors[key]}</p>)}
      </form>
    </div>
  );
};

export default UserForm;
