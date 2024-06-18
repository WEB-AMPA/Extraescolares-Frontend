import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../context/authContext';

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    breakfast: false,
    observations: '',
    course: '',
    partner_number: '',
    centerName: '',
  });

  const [centers, setCenters] = useState([]);
  const [partners, setPartners] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { VITE_URL } = import.meta.env;
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get(`${VITE_URL}/api/centers`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setCenters(response.data);
      } catch (error) {
        console.error('Error fetching centers:', error);
      }
    };

    const fetchPartners = async () => {
      try {
        const response = await axios.get(`${VITE_URL}/api/users/role/partner`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setPartners(response.data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchCenters();
    fetchPartners();
  }, [VITE_URL, auth.token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${VITE_URL}/api/students`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setSubmitted(true);
      setFormData({
        name: '',
        lastname: '',
        breakfast: false,
        observations: '',
        course: '',
        partner_number: '',
        centerName: '',
      });
      setErrors({});
      console.log(response.data);
    } catch (error) {
      setSubmitted(false);
      setErrors(error.response.data.errors || { message: error.response.data.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">Crear un Estudiante</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label htmlFor="lastname" className="block text-gray-700 font-medium mb-2">Apellido:</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="breakfast" className="block text-gray-700 font-medium mb-">Desayuno:</label>
            <label htmlFor="breakfast" className="block text-gray-700 font-normal text-sm">Selecciona si la alumna asiste a desayuno</label>

            <input type="checkbox" id="breakfast" name="breakfast" checked={formData.breakfast} onChange={handleChange} className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-500 rounded" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="observations" className="block text-gray-700 font-medium mb-2">Observaciones:</label>
            <textarea id="observations" name="observations" value={formData.observations} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div>
            <label htmlFor="course" className="block text-gray-700 font-medium mb-2">Curso:</label>
            <input type="text" id="course" name="course" value={formData.course} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label htmlFor="partner_number" className="block text-gray-700 font-medium mb-2">Número de Socio:</label>
            <select id="partner_number" name="partner_number" value={formData.partner_number} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione un Socio</option>
              {partners.map((partner) => (
                <option key={partner._id} value={partner.partner_number}>{partner.name} {partner.lastname} ({partner.partner_number})</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="centerName" className="block text-gray-700 font-medium mb-2">Nombre del Centro:</label>
            <select id="centerName" name="centerName" value={formData.centerName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione un Centro</option>
              {centers.map((center) => (
                <option key={center._id} value={center.name}>{center.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => window.history.back()} className="py-2 px-4 bg-gray-400 text-white font-bold rounded-full hover:bg-gray-500 transition duration-300">Cancelar</button>
          <button type="submit" className="py-2 px-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300">Guardar</button>
        </div>
        {submitted && <p className="text-green-500 mt-4 text-center">¡Estudiante creado exitosamente!</p>}
        {errors.message && <p className="text-red-500 mt-4 text-center">{errors.message}</p>}
      </form>
    </div>
  );
};

export default CreateStudent;
