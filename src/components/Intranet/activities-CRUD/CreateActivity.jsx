import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaTags, FaCalendarAlt, FaClock, FaBuilding } from "react-icons/fa";

const CreateActivityForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    monitorUsername: '',
    categoryNames: [],
    scheduleDays: [],
    scheduleHours: [],
    centerNames: []
  });

  const [categories, setCategories] = useState([]);
  const [scheduleDays, setScheduleDays] = useState([]);
  const [scheduleHours, setScheduleHours] = useState([]);
  const [centers, setCenters] = useState([]);
  const [monitors, setMonitors] = useState([]);
  const { auth } = useAuthContext();
  const { VITE_URL } = import.meta.env;
  const navigate = useNavigate(); // Hook de navegación

  // Configuración del interceptor de Axios
  useEffect(() => {
    axios.interceptors.request.use(
      config => {
        if (auth.token) {
          config.headers.Authorization = `Bearer ${auth.token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }, [auth.token]);

  // Fetch categories, schedule days, schedule hours, centers, and monitors
  const fetchData = useCallback(async () => {
    try {
      const [categoriesRes, scheduleDaysRes, scheduleHoursRes, centersRes, monitorsRes] =
        await Promise.all([
          axios.get(`${VITE_URL}/api/categories`),
          axios.get(`${VITE_URL}/api/scheduleDays`),
          axios.get(`${VITE_URL}/api/scheduleHours`),
          axios.get(`${VITE_URL}/api/centers`),
          axios.get(`${VITE_URL}/api/users/role/monitor`, {
            headers: {
              "Content-Type": "application/json",
            },
          }),
        ]);

      setCategories(categoriesRes.data);
      setScheduleDays(scheduleDaysRes.data);
      setScheduleHours(scheduleHoursRes.data);
      setCenters(centersRes.data);
      setMonitors(monitorsRes.data); // Asegúrate de que monitorsRes.data sea un array
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }, [VITE_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMultiSelectChange = (e) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions).map(option => option.value);
    setFormData({
      ...formData,
      [name]: values
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${VITE_URL}/api/activities`, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      console.log('Activity created successfully:', response.data);
      navigate('/intranet/activities'); // Navegar a la página de actividades después de crear la actividad
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  const handleCancel = () => {
    navigate('/intranet/activities'); // Navegar a la página de actividades al cancelar
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <form className="p-6 bg-white rounded-lg shadow-md max-w-2xl w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Crear Actividad</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-1">
            <label className="block mb-2 text-m font-semibold text-gray-700">Nombre de la Actividad</label>
            <input
              type="text"
              name="name"
              placeholder='Ingresa el nombre de la actividad'
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="col-span-1">
            <label className="block mb-2 text-m font-semibold text-gray-700 flex items-center">
              <FaUser className="mr-2"/> Nombre de Usuario del Monitor
            </label>
            <select
              name="monitorUsername"
              value={formData.monitorUsername}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Seleccionar Monitor</option>
              {Array.isArray(monitors) &&
                monitors.map((monitor) => (
                  <option key={monitor._id} value={monitor.username}>
                    {monitor.username}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-1">
            <label className="block mb-2 text-m font-semibold text-gray-700 flex items-center">
              <FaTags className="mr-2"/> Categorías
            </label>
            <select
              name="categoryNames"
              multiple
              value={formData.categoryNames}
              onChange={handleMultiSelectChange}
              className="w-full px-3 py-2 border rounded-lg appearance-none"
              style={{ backgroundImage: 'none' }}
            >
              {categories.map(category => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block mb-2 text-m font-semibold text-gray-700 flex items-center">
              <FaCalendarAlt className="mr-2"/> Días
            </label>
            <select
              name="scheduleDays"
              multiple
              value={formData.scheduleDays}
              onChange={handleMultiSelectChange}
              className="w-full px-3 py-2 border rounded-lg appearance-none"
              style={{ backgroundImage: 'none' }}
            >
              {scheduleDays.map(day => (
                <option key={day._id} value={day.days}>{day.days}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="col-span-1">
            <label className="block mb-2 text-m font-semibold text-gray-700 flex items-center">
              <FaClock className="mr-2"/> Horarios
            </label>
            <select
              name="scheduleHours"
              multiple
              value={formData.scheduleHours}
              onChange={handleMultiSelectChange}
              className="w-full px-3 py-2 border rounded-lg appearance-none"
              style={{ backgroundImage: 'none' }}
            >
              {scheduleHours.map(hour => (
                <option key={hour._id} value={hour.range}>{hour.range}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block mb-2 text-m font-semibold text-gray-700 flex items-center">
              <FaBuilding className="mr-2"/> Centros
            </label>
            <select
              name="centerNames"
              multiple
              value={formData.centerNames}
              onChange={handleMultiSelectChange}
              className="w-full px-3 py-2 border rounded-lg appearance-none"
              style={{ backgroundImage: 'none' }}
            >
              {centers.map(center => (
                <option key={center._id} value={center.name}>{center.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={handleCancel} className="px-4 py-2 text-gray-700 font-semibold bg-gray-300 rounded-full hover:bg-gray-400">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 text-white font-semibold bg-blue-600 rounded-full hover:bg-blue-700">
            Crear Actividad
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateActivityForm;
