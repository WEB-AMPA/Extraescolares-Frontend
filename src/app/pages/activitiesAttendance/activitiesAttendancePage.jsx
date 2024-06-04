import  { useState } from 'react';
import ActivityAttendanceTable from './activitiesAttendance';

const ActivitiesAttendancePage = () => {
    // Define la variable de estado 'attendances' y la función 'setAttendances'
    const [attendances, setAttendances] = useState([]);

    const handleAttendanceAdded = (newAttendances) => {
        // Agrega las nuevas asistencias a la lista de asistencias existente
        setAttendances([...attendances, ...newAttendances]);
    };

    return (
        <div className="App">
            <h1>Registro de Asistencia</h1>
            {/* Renderiza el componente 'ActivityAttendanceTable' y pasa la función 'handleAttendanceAdded' como prop */}
            <ActivityAttendanceTable onAttendanceAdded={handleAttendanceAdded} />
        </div>
    );
};

export default ActivitiesAttendancePage;

