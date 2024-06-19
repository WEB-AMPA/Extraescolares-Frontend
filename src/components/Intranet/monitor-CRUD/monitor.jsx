import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useAuthContext } from "../../../context/authContext";

const MonitoresTable = () => {
  const [monitors, setMonitors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState(null);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { auth } = useAuthContext();

  const { VITE_URL } = import.meta.env;

  const itemsPerPage = 10;

  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch(`${VITE_URL}/api/activities`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching activities");
      }
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  }, [VITE_URL, auth.token]);

  const fetchMonitors = useCallback(async () => {
    try {
      const response = await fetch(`${VITE_URL}/api/users/role/monitor`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching monitors");
      }
      const data = await response.json();

      setUsers(data);

      const monitorsData = data.map((user) => {
        const activity = activities.find(
          (activity) => activity.monitor && activity.monitor._id === user._id
        );
        return {
          _id: user._id,
          name: user.name,
          lastname: user.lastname,
          activity: activity ? activity.name : "No asignada",
          activityId: activity ? activity._id : null,
        };
      });

      setMonitors(monitorsData);
    } catch (error) {
      console.error("Error fetching monitors:", error);
    }
  }, [activities, VITE_URL, auth.token]);

  useEffect(() => {
    fetchActivities();
    fetchMonitors();
  }, [fetchActivities, fetchMonitors, shouldRefetch]);

  const handleEdit = (monitor) => {
    setSelectedMonitor(monitor);
    setSelectedActivityId(monitor.activityId);
    setIsModalOpen(true);
  };

  const handleDelete = (monitor) => {
    setSelectedMonitor(monitor);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteMonitor = async () => {
    try {
      await fetch(`${VITE_URL}/api/users/${selectedMonitor._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setMonitors(
        monitors.filter((monitor) => monitor._id !== selectedMonitor._id)
      );
      setShouldRefetch(true);
    } catch (error) {
      console.error("Error deleting monitor:", error);
    }
    closeConfirmModal();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const updateActivity = async (e) => {
    e.preventDefault();
    try {
      const updatedActivity = {
        newMonitorUsername: selectedMonitor._id,
        activityId: selectedActivityId,
      };
      const response = await fetch(
        `${VITE_URL}/api/activities/${selectedActivityId}/update-monitor`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(updatedActivity),
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("No autorizado. Verifica tu token de autenticación.");
        }
        throw new Error("Error updating activity");
      }

      const updatedActivityData = await response.json();
      setActivities(
        activities.map((activity) =>
          activity._id === updatedActivityData._id
            ? updatedActivityData
            : activity
        )
      );
      setShouldRefetch(true);
      closeModal();
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const filteredMonitors = monitors.filter((monitor) =>
    `${monitor.name} ${monitor.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredMonitors.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredMonitors.slice(offset, offset + itemsPerPage);

  return (
    <div className="flex flex-col justify-center w-full overflow-x-auto m-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            placeholder="Buscar Monitor"
            value={searchTerm}
            onChange={handleSearch}
            className="shadow appearance-none border rounded-full w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-3 text-gray-500"
          />
        </div>
        <button
          onClick={() => (window.location.href = "/intranet/createuser")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full"
        >
          Crear Monitor
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300"
            >
              Nombre Completo
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300"
            >
              Actividad
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPageData.map((monitor) => (
            <tr key={monitor._id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{`${monitor.name} ${monitor.lastname}`}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{monitor.activity}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-2 sm:space-y-0 space-y-2">
                  <button
                    title="Editar Monitor"
                    onClick={() => handleEdit(monitor)}
                    className="text-white bg-blue-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faEdit} className="w-5 h-5 mb-1" />
                    <span className="text-xs font-light">Editar</span>
                  </button>
                  <button
                    title="Eliminar Monitor"
                    onClick={() => handleDelete(monitor)}
                    className="text-white bg-red-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="w-5 h-5 mb-1"
                    />
                    <span className="text-xs font-light">Eliminar</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg shadow-lg">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 0}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </button>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage >= pageCount - 1}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{offset + 1}</span> a{" "}
              <span className="font-medium">
                {Math.min(offset + itemsPerPage, filteredMonitors.length)}
              </span>{" "}
              de <span className="font-medium">{filteredMonitors.length}</span>{" "}
              resultados
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 0}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {[...Array(pageCount).keys()].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                    page === currentPage
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage >= pageCount - 1}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              Editar asignaciones a Monitor
            </h2>
            <form onSubmit={updateActivity}>
              <div className="mb-4">
                <label className="block text-m font-medium text-gray-700">
                  Actividad:
                  <select
                    value={selectedActivityId}
                    onChange={(e) => setSelectedActivityId(e.target.value)}
                    className="block w-full mt-1 p-2 border rounded-lg"
                  >
                    {activities.map((activity) => (
                      <option key={activity._id} value={activity._id}>
                        {activity.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-m font-medium text-gray-700">
                  Monitor:
                  <select
                    value={selectedMonitor?._id}
                    onChange={(e) =>
                      setSelectedMonitor({
                        ...selectedMonitor,
                        _id: e.target.value,
                      })
                    }
                    className="block w-full mt-1 p-2 border rounded-lg"
                  >
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {`${user.name} ${user.lastname}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-full mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p>
              ¿Estás seguro de que deseas eliminar a {selectedMonitor.name}{" "}
              {selectedMonitor.lastname}?
            </p>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeConfirmModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={deleteMonitor}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonitoresTable;