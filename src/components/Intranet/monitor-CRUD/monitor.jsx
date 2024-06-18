import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../../context/authContext';

const EditMonitor = () => {
  const [monitors, setMonitors] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    roleName: '',
    lastname: '',
    name: '',
    phone_number: '',
    partner_number: ''
  });
  const { VITE_URL } = import.meta.env;
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const response = await axios.get(`${VITE_URL}/api/users/role/monitor`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setMonitors(response.data);
      } catch (error) {
        console.error('Error fetching monitors:', error);
      }
    };

    fetchMonitors();
  }, [VITE_URL, auth.token]);

  const handleEdit = (monitor) => {
    setSelectedMonitor(monitor);
    setFormData({
      username: monitor.username,
      email: monitor.email,
      roleName: monitor.roleName,
      lastname: monitor.lastname,
      name: monitor.name,
      phone_number: monitor.phone_number || '',
      partner_number: monitor.partner_number || ''
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${VITE_URL}/api/users/${selectedMonitor._id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(response.data);
      setIsEditModalOpen(false);
      const updatedMonitors = monitors.map((monitor) =>
        monitor._id === selectedMonitor._id ? response.data : monitor
      );
      setMonitors(updatedMonitors);
    } catch (error) {
      console.error('Error updating monitor:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor) => (
            <tr key={monitor._id}>
              <td>{monitor.username}</td>
              <td>{monitor.email}</td>
              <td>
                <button
                  title="Editar Monitor"
                  onClick={() => handleEdit(monitor)}
                  className="text-white bg-blue-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faEdit} className="w-5 h-5 mb-1" />
                  <span className="text-xs font-light">Editar</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 shadow-lg w-full max-w-4xl mx-4">
            <button
              type="button"
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Editar Monitor</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block mb-2 font-medium">Nombre de Usuario:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 font-medium">Correo Electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 font-medium">Rol:</label>
                <select
                  name="roleName"
                  value={formData.roleName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="coordinator">Coordinador</option>
                  <option value="partner">Socio</option>
                  <option value="admin">Admin</option>
                  <option value="monitor">Monitor</option>
                </select>
              </div>
              <div className="col-span-1">
                <label className="block mb-2 font-medium">Nombre:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 font-medium">Apellido:</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {formData.roleName === 'partner' && (
                <>
                  <div className="col-span-1">
                    <label className="block mb-2 font-medium">Número de Teléfono:</label>
                    <input
                      type="text"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block mb-2 font-medium">Número de Socio:</label>
                    <input
                      type="text"
                      name="partner_number"
                      value={formData.partner_number}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </>
              )}
              <div className="col-span-2 flex justify-end mt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-4 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMonitor;
