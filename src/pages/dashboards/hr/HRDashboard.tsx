import { useState, useEffect } from 'react';
import AddEmployeeForm from './AddEmployeeForm';
import { fetchAllEmployees, generatePayroll } from '../../../services/api';
import EmployeeList from './EmployeeList';

type Employee = {
  id: number;
  user_name: string;
  email: string;
  role: string;
};

export default function HRDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [_employees, setEmployees] = useState<Employee[]>([]);
  const [_loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await fetchAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handlePayroll = async () => {
    try {
      await generatePayroll();
      alert('Payroll generated successfully!');
    } catch (err) {
      console.error('Payroll error:', err);
      alert('Failed to generate payroll');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">HR Dashboard</h1>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Close Form' : 'Add Employee'}
        </button>

        <button
          onClick={handlePayroll}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Payroll
        </button>
      </div>


      {/* Add Employee Form */}
      {showForm && (
        <div className="mb-6 border p-4 rounded shadow">
          <AddEmployeeForm onEmployeeAdded={fetchEmployees} />
        </div>
      )}

      {/* Employee List */}
      <EmployeeList/>
      {/* <h2 className="text-xl font-semibold mb-2">Employee List</h2>
      {loading ? (
        <p>Loading employees...</p>
      ) : employees.length > 0 ? (
        <table className="border w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="p-2 border text-grey-700">{emp.user_name}</td>
                <td className="p-2 border text-grey-700">{emp.email}</td>
                <td className="p-2 border">{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )} */}
    </div>
  );
}
