import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useAuthContext } from "../../../context/authContext";

const PartnersTable = () => {
  const [partners, setPartners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { VITE_URL } = import.meta.env;
  const { auth } = useAuthContext();

  const itemsPerPage = 10;

  const fetchPartners = useCallback(async () => {
    try {
      const response = await fetch(`${VITE_URL}/api/users/role/partner`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching partners");
      }
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  }, [VITE_URL, auth.token]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners, shouldRefetch]);

  const handleEdit = (partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  const handleDelete = (partner) => {
    setSelectedPartner(partner);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletePartner = async () => {
    try {
      await fetch(`${VITE_URL}/api/users/${selectedPartner._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setPartners(
        partners.filter((partner) => partner._id !== selectedPartner._id)
      );
      setShouldRefetch(true);
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
    closeConfirmModal();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const updatePartner = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${VITE_URL}/api/users/${selectedPartner._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(selectedPartner),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating partner");
      }

      setShouldRefetch(true);
      closeModal();
    } catch (error) {
      console.error("Error updating partner:", error);
    }
  };

  const filteredPartners = partners.filter((partner) =>
    `${partner.name} ${partner.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPartners.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredPartners.slice(offset, offset + itemsPerPage);

  const viewMore = (partnerId) => {
    window.location.href = `/intranet/students/${partnerId}`;
  };

  return (
    <div className="flex flex-col justify-center w-full overflow-x-auto m-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            placeholder="Buscar Socio"
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
          Crear Socio
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300"
            >
              Nº Socio
            </th>
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
              Número de Teléfono
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
          {currentPageData.map((partner) => (
            <tr key={partner._id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">
                  {partner.partner_number}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{`${partner.name} ${partner.lastname}`}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">
                  {partner.phone_number}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{partner.email}</div>
              </td>
              <td className="flex flex-col sm:flex-row justify-center px-4 py-3 text-sm font-medium space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  title="Ver Más"
                  onClick={() => viewMore(partner._id)}
                  className="text-white bg-green-500 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faEye} className="w-5 h-5 mb-1" />
                  <span className="text-xs font-light">Ver Más</span>
                </button>
                <button
                  title="Editar Socio"
                  onClick={() => handleEdit(partner)}
                  className="text-white bg-blue-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faEdit} className="w-5 h-5 mb-1" />
                  <span className="text-xs font-light">Editar</span>
                </button>
                <button
                  title="Eliminar Socio"
                  onClick={() => handleDelete(partner)}
                  className="text-white bg-red-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="w-5 h-5 mb-1" />
                  <span className="text-xs font-light">Eliminar</span>
                </button>
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
                {Math.min(offset + itemsPerPage, filteredPartners.length)}
              </span>{" "}
              de <span className="font-medium">{filteredPartners.length}</span>{" "}
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
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index)}
                  className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    index === currentPage
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  {index + 1}
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-25 absolute inset-0"></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Editar Socio
              </h3>
              <form onSubmit={updatePartner}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={selectedPartner?.name || ""}
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        name: e.target.value,
                      })
                    }
                    className="mt-1 p-2 w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    value={selectedPartner?.lastname || ""}
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        lastname: e.target.value,
                      })
                    }
                    className="mt-1 p-2 w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    value={selectedPartner?.phone_number || ""}
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        phone_number: e.target.value,
                      })
                    }
                    className="mt-1 p-2 w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={selectedPartner?.email || ""}
                    onChange={(e) =>
                      setSelectedPartner({
                        ...selectedPartner,
                        email: e.target.value,
                      })
                    }
                    className="mt-1 p-2 w-full border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isConfirmModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Eliminar Socio
                </h3>
                <p className="mb-4">
                  ¿Estás seguro de que deseas eliminar este socio?
                </p>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeConfirmModal}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mr-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={deletePartner}
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Eliminar
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

export default PartnersTable;
