import { useState, useEffect, useCallback } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const Students = () => {

  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { VITE_URL } = import.meta.env

  const itemsPerPage = 10;

  const fetchStudents = useCallback(async () => {
    try {
      const response = await fetch(`${VITE_URL}/api/students/`);
      if (!response.ok) throw new Error('Error fetching students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }, []);

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

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteStudent = async () => {
    try {
      await fetch(`${VITE_URL}/api/students/${selectedStudent._id}`, {
        method: 'DELETE',
      });
      setStudents(students.filter(student => student._id !== selectedStudent._id));
      setShouldRefetch(true);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
    closeConfirmModal();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    const updatedStudentData = {
      name: selectedStudent.name,
      lastname: selectedStudent.lastname,
      breakfast: selectedStudent.breakfast,
      course: selectedStudent.course,
      partner_number: selectedStudent.partner_number,
      centerName: selectedStudent.centerName,
      observations: selectedStudent.observations,
    };

    try {
      const response = await fetch(`${VITE_URL}/api/students/${selectedStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
        <input
          type="text"
          placeholder="Buscar por Nombre y Apellidos..."
          value={searchTerm}
          onChange={handleSearch}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          style={{ maxWidth: '300px' }}
        />
        <button
          onClick={() => window.location.href = '/intranet/createstudent'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Estudiante
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Nombre Completo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Curso
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Desayuno
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Observaciones
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
              Ajustes
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPageData.map((student) => (
            <tr key={student._id} className="border-b border-gray-300">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{`${student.name} ${student.lastname}`}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.course}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.breakfast ? 'Sí' : 'No'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.observations}</div>
              </td>
              <td className="flex justify-center px-6 py-3 text-sm font-medium">
                <button title="Ver Más" onClick={() => viewMore(student._id)} className="text-white p-2 m-2 bg-green-500 rounded">
                  Ver Más
                </button>
                <button title="Editar Estudiante" onClick={() => handleEdit(student)} className="text-white p-2 m-2 bg-blue-800 rounded">
                  <FaEdit />
                </button>
                <button title="Eliminar Estudiante" onClick={() => handleDelete(student)} className="text-white p-2 m-2 bg-red-700 rounded">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 0}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage >= pageCount - 1}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{offset + 1}</span> to <span className="font-medium">{Math.min(offset + itemsPerPage, filteredStudents.length)}</span> of <span className="font-medium">{filteredStudents.length}</span> results
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
                  value={selectedStudent.name}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastname"
                  value={selectedStudent.lastname}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, lastname: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="breakfast" className="block text-sm font-medium text-gray-700">
                  Desayuno
                </label>
                <select
                  id="breakfast"
                  value={selectedStudent.breakfast}
                  onChange={(e) => setSelectedStudent({ ...selectedStudent, breakfast: e.target.value === 'true' })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
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

      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar a este estudiante?</p>
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={deleteStudent}
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

export default Students;
