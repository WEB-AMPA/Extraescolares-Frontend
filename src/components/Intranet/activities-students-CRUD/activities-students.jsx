import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { Link } from 'react-router-dom';

const ActivitiesStudent = () => {
  const { studentId } = useParams();
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const url = studentId 
          ? `http://localhost:3000/api/activitiesStudents?studentId=${studentId}`
          : `http://localhost:3000/api/activitiesStudents`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Error fetching activities');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, [studentId]);

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleDelete = (activity) => {
    setSelectedActivity(activity);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteActivity = () => {
    closeConfirmModal();
  };

  return (
    <div className="flex justify-center overflow-x-auto m-4 p-4">
      <table className="divide-y divide-gray-600 border border-gray-300 rounded-lg">
        <thead className="bg-gray-200 gap-3 items-center">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Actividad</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Categoría</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Monitor</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Horario</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Días</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Observaciones</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Ajustes</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">No hay actividades para este estudiante.</td>
            </tr>
          ) : (
            activities.map((activity) => (
              <tr key={activity._id} className="border-b border-gray-300">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.activity?.name || 'Nombre no disponible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.activity?.categories?.[0]?.name || 'Categoría no disponible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.activity?.monitor?.name || 'Monitor no disponible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.activity?.scheduleHour?.[0]?.range || 'Horario no disponible'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.activity?.scheduleDay?.[0]?.days || 'Días no disponibles'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{activity?.activity?.observations || 'Observaciones no disponibles'}</div>
                </td>
                <td className="flex px-6 py-3 text-center text-sm font-medium">
                  <button title="Editar Actividad" onClick={() => handleEdit(activity)} className="text-white p-2 m-2 bg-blue-800 rounded">
                    <FaEdit />
                  </button>
                  <button title="Eliminar Actividad" onClick={() => handleDelete(activity)} className="text-white p-2 m-2 bg-red-700 rounded">
                    <MdDelete />
                  </button>
                  <Link to={`/intranet/actividades/${activity._id}`} className="p-2 m-2 bg-yellow-300 rounded flex items-center justify-center" title="Ver Detalles de la Actividad">
                    <CiViewList />
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form className="p-8 border border-black rounded">
                  <h3 className="mb-5 text-xl text-center leading-6 font-medium text-gray-400">Editar Actividad</h3>
                  <div className="mb-4">
                    <label htmlFor="activityName" className="block text-sm font-medium text-gray-700 m-2">Nombre de la Actividad:</label>
                    <input type="text" name="activityName" id="activityName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue={selectedActivity?.activity?.name || ''} readOnly />
                  </div>
                  <div className="mt-9 justify-center bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                      Guardar 
                    </button>
                    <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="confirm-modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="mb-5 text-xl text-center leading-6 font-medium text-gray-400">¿Seguro que quieres eliminar esta actividad?</h3>
                <div className="mt-9 justify-center bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={deleteActivity}>
                    Confirmar
                  </button>
                  <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-900 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeConfirmModal}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesStudent;
