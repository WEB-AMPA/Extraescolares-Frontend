import { useState, useEffect, useCallback } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useAuthContext } from "../../../context/authContext";
import axios from "axios";

const CoordinatorTable = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { VITE_URL } = import.meta.env;
  const { auth } = useAuthContext();

  const itemsPerPage = 10;

  const fetchCoordinators = useCallback(async () => {
    try {
      const response = await fetch(`${VITE_URL}/api/users/role/coordinator`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching coordinators");
      }
      const data = await response.json();
      setCoordinators(data);
    } catch (error) {
      console.error("Error fetching coordinators:", error);
    }
  }, [VITE_URL, auth.token]);

  useEffect(() => {
    fetchCoordinators();
  }, [fetchCoordinators, shouldRefetch]);

  const handleEdit = (coordinator) => {
    setSelectedCoordinator(coordinator);
    setIsModalOpen(true);
  };

  const handleDelete = (coordinator) => {
    setSelectedCoordinator(coordinator);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteCoordinator = async () => {
    try {
      await fetch(`${VITE_URL}/api/users/${selectedCoordinator._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setCoordinators(
        coordinators.filter(
          (coordinator) => coordinator._id !== selectedCoordinator._id
        )
      );
      setShouldRefetch(true);
    } catch (error) {
      console.error("Error deleting coordinator:", error);
    }
    closeConfirmModal();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const updateCoordinator = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${VITE_URL}/api/users/${selectedCoordinator._id}`,
        selectedCoordinator,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      console.log("Respuesta de actualización:", response.data);

      setShouldRefetch(true);
      closeModal();
    } catch (error) {
      console.error("Error actualizando coordinador:", error.response ? error.response.data : error.message);
    }
  };

  const filteredCoordinators = coordinators.filter((coordinator) =>
    `${coordinator.name} ${coordinator.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredCoordinators.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredCoordinators.slice(
    offset,
    offset + itemsPerPage
  );

  return (
    <div className="flex flex-col justify-center w-full overflow-x-auto m-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            placeholder="Buscar Coordinador"
            value={searchTerm}
            onChange={handleSearch}
            className="shadow appearance-none border rounded-full w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
        <button
          onClick={() => (window.location.href = "/intranet/createuser")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full"
        >
          Crear Coordinador
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
              Nombre de Usuario
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300"
            >
              Correo
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300"
            >
              Ajustes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPageData.map((coordinator) => (
            <tr key={coordinator._id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{`${coordinator.name} ${coordinator.lastname}`}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">
                  {coordinator.username}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{coordinator.email}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-2 sm:space-y-0 space-y-2">
                  <button
                    title="Editar Coordinador"
                    onClick={() => handleEdit(coordinator)}
                    className="text-white bg-blue-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FaEdit className="w-5 h-5 mb-1" />
                    <span className="text-xs font-light">Editar</span>
                  </button>
                  <button
                    title="Eliminar Coordinador"
                    onClick={() => handleDelete(coordinator)}
                    className="text-white bg-red-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <MdDelete className="w-5 h-5 mb-1" />
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
                {Math.min(offset + itemsPerPage, filteredCoordinators.length)}
              </span>{" "}
              de <span className="font-medium">{filteredCoordinators.length}</span>{" "}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:max-w-lg">
            <h2 className="text-xl font-bold mb-4">Editar Coordinador</h2>
            <form onSubmit={updateCoordinator}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={selectedCoordinator?.name || ""}
                  onChange={(e) =>
                    setSelectedCoordinator({
                      ...selectedCoordinator,
                      name: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="lastname"
                  value={selectedCoordinator?.lastname || ""}
                  onChange={(e) =>
                    setSelectedCoordinator({
                      ...selectedCoordinator,
                      lastname: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  value={selectedCoordinator?.username || ""}
                  onChange={(e) =>
                    setSelectedCoordinator({
                      ...selectedCoordinator,
                      username: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  value={selectedCoordinator?.email || ""}
                  onChange={(e) =>
                    setSelectedCoordinator({
                      ...selectedCoordinator,
                      email: e.target.value,
                    })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a este coordinador?</p>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={deleteCoordinator}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Eliminar
              </button>
              <button
                onClick={closeConfirmModal}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinatorTable;
