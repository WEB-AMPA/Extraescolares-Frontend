import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../context/authContext';

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
    } catch (error) {
      console.error('Error creating activity:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form className="p-6 bg-white rounded shadow-md max-w-lg w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Activity Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Nombre de Usuario del Monitor</label>
          <select
            name="monitorUsername"
            value={formData.monitorUsername}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
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
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Categorias</label>
          <select
            name="categoryNames"
            multiple
            value={formData.categoryNames}
            onChange={handleMultiSelectChange}
            className="w-full px-3 py-2 border rounded appearance-none"
            style={{ backgroundImage: 'none' }} // Remove the dropdown arrow
          >
            {categories.map(category => (
              <option key={category._id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Días</label>
          <select
            name="scheduleDays"
            multiple
            value={formData.scheduleDays}
            onChange={handleMultiSelectChange}
            className="w-full px-3 py-2 border rounded appearance-none"
            style={{ backgroundImage: 'none' }} // Remove the dropdown arrow
          >
            {scheduleDays.map(day => (
              <option key={day._id} value={day.days}>{day.days}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Horarios</label>
          <select
            name="scheduleHours"
            multiple
            value={formData.scheduleHours}
            onChange={handleMultiSelectChange}
            className="w-full px-3 py-2 border rounded appearance-none"
            style={{ backgroundImage: 'none' }} // Remove the dropdown arrow
          >
            {scheduleHours.map(hour => (
              <option key={hour._id} value={hour.range}>{hour.range}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Centros</label>
          <select
            name="centerNames"
            multiple
            value={formData.centerNames}
            onChange={handleMultiSelectChange}
            className="w-full px-3 py-2 border rounded appearance-none"
            style={{ backgroundImage: 'none' }} // Remove the dropdown arrow
          >
            {centers.map(center => (
              <option key={center._id} value={center.name}>{center.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">Crear Actividad</button>
      </form>
    </div>
  );
};

export default CreateActivityForm;
