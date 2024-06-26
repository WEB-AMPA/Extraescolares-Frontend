import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useAuthContext } from "../../../context/authContext";

const ActivityAttendanceTable = ({ onAttendanceAdded }) => {
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const { VITE_URL } = import.meta.env;
  const navigate = useNavigate();
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const responseActivities = await axios.get(
          `${VITE_URL}/api/activities`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setActivities(responseActivities.data);
        if (responseActivities.data.length > 0) {
          setSelectedActivity(responseActivities.data[0]._id);
        }
      } catch (error) {
        setError("Error fetching activities. Please try again.");
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const fetchStudentsByActivityAndDate = async () => {
      try {
        const response = await axios.get(
          `${VITE_URL}/api/attendance/activitiesStudents/by-activity-and-date/${selectedActivity}/${date}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setStudents(response.data);
      } catch (error) {
        setError("Error fetching students. Please try again.");
        console.error("Error fetching students:", error);
      }
    };

    if (selectedActivity && date) {
      fetchStudentsByActivityAndDate();
    }
  }, [selectedActivity, date]);

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleAttendanceChange = (studentId, attendance) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.student._id === studentId ? { ...student, attendance } : student
      )
    );
  };

  const handleSaveAll = async () => {
    const attendanceRecords = students
      .filter((student) => student.attendance !== "none")
      .map((student) => ({
        date: date,
        activities_student: student._id,
        attendance: student.attendance === "present" ? 1 : 0,
      }));

    if (attendanceRecords.length === 0) {
      setError("No attendance records to save.");
      return;
    }

    try {
      const createdAttendances = [];
      for (const record of attendanceRecords) {
        const response = await axios.post(
          `${VITE_URL}/api/attendance/registerAttendance`,
          record,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        createdAttendances.push({ ...record, id: response.data._id });
      }
      onAttendanceAdded(createdAttendances);
      setError("");
    } catch (error) {
      setError("Error saving attendance. Please try again.");
      console.error("Error saving attendance:", error);
    }
  };

  const handleViewMore = (activitiesStudentId) => {
    if (activitiesStudentId) {
      navigate(`/intranet/calendar/activities/${activitiesStudentId}`);
    } else {
      setError("Invalid activities_student ID.");
    }
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = students.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(students.length / itemsPerPage);

  return (
    <div className="flex flex-col justify-center w-full overflow-x-auto m-4 p-4 shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <select
          value={selectedActivity}
          onChange={handleActivityChange}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 mr-4"
        >
          {activities.map((activity) => (
            <option key={activity._id} value={activity._id}>
              {activity.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">
              Estudiante
            </th>
            <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">
              Asistencia
            </th>
            <th scope="col" className="px-6 py-3 text-left text-[1rem] font-semibold text-black uppercase tracking-wider border-b border-gray-300">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPageData.map((student, index) => (
            <tr key={student._id} className="border-b border-gray-300 hover:bg-gray-100 transition duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-m text-gray-900">{date}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-m text-gray-900">{student.student.name} {student.student.lastname}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={student.attendance}
                  onChange={(e) => handleAttendanceChange(student.student._id, e.target.value)}
                  className="border border-gray-300 text-gray-900 text-m rounded-lg p-2.5"
                >
                  <option value="none">Seleccionar</option>
                  <option value="present">Sí</option>
                  <option value="absent">No</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  onClick={() => handleViewMore(student._id)}
                  className="text-white bg-green-500 rounded-lg p-2 flex flex-col items-center w-20 sm:w-auto transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <FaEye className="w-5 h-5 mb-1" />
                  <span className="text-xs font-light">Ver Más</span>
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
                {Math.min(offset + itemsPerPage, students.length)}
              </span>{" "}
              de <span className="font-medium">{students.length}</span>{" "}
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
      <div className="flex justify-end p-6">
        <button
          onClick={handleSaveAll}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Guardar Todo
        </button>
      </div>
      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

ActivityAttendanceTable.propTypes = {
  onAttendanceAdded: PropTypes.func.isRequired,
};

const ActivitiesAttendancePage = () => {
  const [attendances, setAttendances] = useState([]);

  const handleAttendanceAdded = (newAttendances) => {
    setAttendances([...attendances, ...newAttendances]);
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center mb-4">Registro de Asistencia</h1>
      <ActivityAttendanceTable onAttendanceAdded={handleAttendanceAdded} />
    </div>
  );
};

export default ActivitiesAttendancePage;
