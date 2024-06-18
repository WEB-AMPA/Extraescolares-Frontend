import { useState, useEffect, useCallback } from 'react';
import { FaEdit, FaEye, FaSearch } from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useAuthContext } from '../../../context/authContext';

const StudentsPartner = () => {

  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { VITE_URL } = import.meta.env;
  const { auth } = useAuthContext();

  let partnerId = auth.partnerId;

  const itemsPerPage = 10;

  const fetchStudents = useCallback(async () => {
    if (!partnerId) return;
    try {
      const response = await fetch(`${VITE_URL}/api/students/partner/${partnerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${auth.token}`
        }
      });
      if (!response.ok) throw new Error('Error fetching students');

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }, [partnerId, VITE_URL, auth.token]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents, shouldRefetch]);

  const handleEdit = (student) => {
    const completeStudent = {
      ...student,
      partner_number: student.partner?.partner_number || '',
      centerName: student.center?.name || '',
    };
    setSelectedStudent(completeStudent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    const updatedStudentData = {
      observations: selectedStudent.observations,
      name: selectedStudent.name,
      lastname: selectedStudent.lastname,
      breakfast: selectedStudent.breakfast,
      course: selectedStudent.course,
      partner_number: selectedStudent.partner_number,
      centerName: selectedStudent.centerName,
    };

    try {
      const response = await fetch(`${VITE_URL}/api/students/${selectedStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(updatedStudentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating student:', errorData);
        throw new Error('Error updating student');
      }

      setShouldRefetch(true);
      closeModal();
    } catch (error) {
      console.error('Error updating student:', error.message);
      closeModal();
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const filteredStudents = students.filter(student =>
    `${student.name} ${student.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredStudents.slice(offset, offset + itemsPerPage);

  const viewMore = (studentId) => {
    window.location.href = `/intranet/activities-student/${studentId}`;
  };

  return (
    <div className="flex flex-col justify-center w-full overflow-x-auto m-4 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative" style={{ maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Buscar estudiante"
            value={searchTerm}
            onChange={handleSearch}
            className="shadow appearance-none border rounded-full w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">
              Nombre Completo
            </th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">
              Curso
            </th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">
              Desayuno
            </th>
            <th scope="col" className="px-4 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">
              Observaciones
            </th>
            <th scope="col" className="px-4 py-3 text-center text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">
              Ajustes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPageData.map((student) => (
            <tr key={student._id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{`${student.name} ${student.lastname}`}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{student.course}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{student.breakfast ? 'Sí' : 'No'}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="text-m text-gray-900">{student.observations}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex flex-col sm:flex-row justify-center items-center space-x-0 sm:space-x-2 sm:space-y-0 space-y-2">
                  <button title="Ver Más" onClick={() => viewMore(student._id)} className="text-white bg-green-500 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105">
                    <FaEye className="w-5 h-5 mb-1" />
                    <span className="text-xs font-light">Ver Más</span>
                  </button>
                  <button title="Editar Estudiante" onClick={() => handleEdit(student)} className="text-white bg-blue-600 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105">
                    <FaEdit className="w-5 h-5 mb-1" />
                    <span className="text-xs font-light">Editar</span>
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
              Mostrando <span className="font-medium">{offset + 1}</span> a <span className="font-medium">{Math.min(offset + itemsPerPage, filteredStudents.length)}</span> de <span className="font-medium">{filteredStudents.length}</span> resultados
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 0}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index)}
                  className={`relative inline-flex items-center border ${currentPage === index ? 'border-indigo-500 bg-indigo-50 z-10' : 'border-gray-300 bg-white'} px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage >= pageCount - 1}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
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
            <h2 className="text-xl font-bold mb-4">Editar Estudiante</h2>
            <form onSubmit={updateStudent}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={`${selectedStudent.name} ${selectedStudent.lastname}`}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="observations" className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <textarea
                  id="observations"
                  value={selectedStudent.observations}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, observations: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
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
    </div>
  );
};

export default StudentsPartner;
