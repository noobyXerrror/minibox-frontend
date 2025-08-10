import { markAttendance } from '../../../services/api';

export default function AttendanceButton() {
  const handleClick = async () => {
    await markAttendance();
    alert('Attendance Marked!');
  };

  return (
    <button onClick={handleClick} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
      Mark Attendance
    </button>
  );
}
