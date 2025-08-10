import { useEffect, useState } from 'react';
import { fetchEmployeeDashboard } from '../../../services/api';
import AttendanceButton from './AttendanceButton';

export default function EmployeeDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchEmployeeDashboard().then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome {data.name}</h1>
      <p>Email: {data.email}</p>
      <p>Salary: ₹{data.salary}</p>
      <AttendanceButton />
    </div>
  );
}
