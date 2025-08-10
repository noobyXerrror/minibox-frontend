import { useEffect, useState } from 'react';
import { fetchAllEmployees } from '../../../services/api';
import EmployeeCard from '../../../components/EmployeeCard';

export default function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    fetchAllEmployees()
      .then(res => {
        console.log("API raw response:", res);
        console.log("API data:", res.data);
        setEmployees(Array.isArray(res) ? res: []);
      })
      .catch(err => {
        console.error('Error fetching employees:', err);
        setEmployees([]);
      });
  }, []);

  console.log("Employees state:", employees);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {employees.length > 0 ? (
        employees.map(emp => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))
      ) : (
        <p>No employees found</p>
      )}
    </div>
  );
}
