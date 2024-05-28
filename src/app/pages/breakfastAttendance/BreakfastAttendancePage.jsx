
import AttendanceTable from '../../components/breakfastAttendanceComponents/AttendanceTable';

const App = () => {
    const handleAttendanceAdded = (data) => {
        console.log('Attendance added:', data);
    };

    return (
        <div className="App">
            <AttendanceTable onAttendanceAdded={handleAttendanceAdded} />
        </div>
    );
};

export default App;
