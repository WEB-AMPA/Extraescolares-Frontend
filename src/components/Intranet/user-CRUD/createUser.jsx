import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../context/authContext';

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure that the partner_number field only contains numeric values
    if (name === 'partner_number' && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${VITE_URL}/api/users`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setSubmitted(true);
      console.log(response.data);
    } catch (error) {
      setSubmitted(false);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Error creando el usuario' });
      }
    }
  };

  const { roleName } = formData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear un usuario</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="username" className="block text-gray-700">Nombre de Usuario:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Correo Electrónico:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
          </div>
          <div>
            <label htmlFor="roleName" className="block text-gray-700">Rol:</label>
            <select id="roleName" name="roleName" value={formData.roleName} onChange={handleChange} required className="mt-1 p-2 w-full border rounded">
              <option value="">Seleccione Rol</option>
              <option value="coordinator">Coordinador</option>
              <option value="partner">Socio</option>
              <option value="admin">Admin</option>
              <option value="monitor">Monitor</option>
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700">Nombre:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
          </div>
          <div>
            <label htmlFor="lastname" className="block text-gray-700">Apellido:</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
          </div>
          {roleName === 'partner' && (
            <>
              <div>
                <label htmlFor="phone_number" className="block text-gray-700">Número de Teléfono:</label>
                <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required={roleName === 'partner'} className="mt-1 p-2 w-full border rounded"/>
              </div>
              <div>
                <label htmlFor="partner_number" className="block text-gray-700">Número de Socio:</label>
                <input type="text" id="partner_number" name="partner_number" value={formData.partner_number} onChange={handleChange} required={roleName === 'partner'} className="mt-1 p-2 w-full border rounded"/>
              </div>
            </>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Guardar</button>
        {submitted && <p className="text-green-500 mt-4 text-center">¡Usuario creado exitosamente!</p>}
        {errors && Object.keys(errors).map((key) => <p key={key} className="text-red-500 text-center">{errors[key]}</p>)}
      </form>
    </div>
  );
};

export default UserForm;
