import  { useState } from 'react';
import axios from 'axios';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users', formData);
      setSubmitted(true);
      console.log(response.data);
    } catch (error) {
      setErrors(error.response.data.errors || {});
    }
  };

  const { roleName } = formData;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Nombre de Usuario:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Correo Electrónico:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
      </div>
      <div className="mb-4">
        <label htmlFor="roleName" className="block text-gray-700">Rol:</label>
        <select id="roleName" name="roleName" value={formData.roleName} onChange={handleChange} required className="mt-1 p-2 w-full border rounded">
          <option value="">Seleccione Rol</option>
          <option value="coordinator">Coordinador</option>
          <option value="partner">Socio</option>
          <option value="admin">Admin</option>
          <option value="monitor">Monitor</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Nombre:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
      </div>
      <div className="mb-4">
        <label htmlFor="lastname" className="block text-gray-700">Apellido:</label>
        <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
      </div>
      {roleName === 'partner' && (
        <>
          <div className="mb-4">
            <label htmlFor="phone_number" className="block text-gray-700">Número de Teléfono:</label>
            <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required={roleName === 'partner'} className="mt-1 p-2 w-full border rounded"/>
          </div>
          <div className="mb-4">
            <label htmlFor="partner_number" className="block text-gray-700">Número de Socio:</label>
            <input type="number" id="partner_number" name="partner_number" value={formData.partner_number} onChange={handleChange} required={roleName === 'partner'} className="mt-1 p-2 w-full border rounded"/>
          </div>
        </>
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
      {submitted && <p className="text-green-500 mt-4">¡Usuario creado exitosamente!</p>}
      {errors && Object.keys(errors).map((key) => <p key={key} className="text-red-500">{errors[key]}</p>)}
    </form>
  );
};

export default UserForm;
