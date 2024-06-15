import { useState, useEffect } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/centers');
        setCenters(response.data);
      } catch (error) {
        console.error('Error fetching centers:', error);
      }
    };

    const fetchPartners = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/role/partner');
        setPartners(response.data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchCenters();
    fetchPartners();
  }, []);

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
      const response = await axios.post('http://localhost:3000/api/students', formData);
      setSubmitted(true);
      setErrors({});
      console.log(response.data);
    } catch (error) {
      setErrors(error.response.data.errors || { message: error.response.data.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-1xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear un Estudiante</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Nombre:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
          </div>
          <div>
            <label htmlFor="lastname" className="block text-gray-700">Apellido:</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
          </div>
          <div>
            <label htmlFor="breakfast" className="block text-gray-700">Desayuno:</label>
            <input type="checkbox" id="breakfast" name="breakfast" checked={formData.breakfast} onChange={handleChange} className="mt-1"/>
          </div>
          <div>
            <label htmlFor="observations" className="block text-gray-700">Observaciones:</label>
            <textarea id="observations" name="observations" value={formData.observations} onChange={handleChange} className="mt-1 p-2 w-full border rounded"></textarea>
          </div>
          <div>
            <label htmlFor="course" className="block text-gray-700">Curso:</label>
            <input type="text" id="course" name="course" value={formData.course} onChange={handleChange} required className="mt-1 p-2 w-full border rounded"/>
          </div>
          <div>
            <label htmlFor="partner_number" className="block text-gray-700">Número de Socio:</label>
            <select id="partner_number" name="partner_number" value={formData.partner_number} onChange={handleChange} required className="mt-1 p-2 w-full border rounded">
              <option value="">Seleccione un Socio</option>
              {partners.map((partner) => (
                <option key={partner._id} value={partner.partner_number}>{partner.name} {partner.lastname} ({partner.partner_number})</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="centerName" className="block text-gray-700">Nombre del Centro:</label>
            <select id="centerName" name="centerName" value={formData.centerName} onChange={handleChange} required className="mt-1 p-2 w-full border rounded">
              <option value="">Seleccione un Centro</option>
              {centers.map((center) => (
                <option key={center._id} value={center.name}>{center.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Guardar</button>
        {submitted && <p className="text-green-500 mt-4 text-center">¡Estudiante creado exitosamente!</p>}
        {errors.message && <p className="text-red-500 mt-4 text-center">{errors.message}</p>}
      </form>
    </div>
  );
};

export default CreateStudent;
