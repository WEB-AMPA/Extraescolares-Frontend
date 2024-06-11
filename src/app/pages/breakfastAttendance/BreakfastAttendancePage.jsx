
import BreakfastAttendanceTable from '../../components/attendance-tables/Breakfast';


const breakfast = () => {
    const handleAttendanceAdded = (data) => {
        console.log('Attendance added:', data);
    };

    return (
        <div className="flex">
            <div className="flex-grow"> {/* Agrega un margen izquierdo para dejar espacio para el sidebar */}
                <BreakfastAttendanceTable onAttendanceAdded={handleAttendanceAdded} />
            </div>
        </div>
    );
};
export default breakfast;
