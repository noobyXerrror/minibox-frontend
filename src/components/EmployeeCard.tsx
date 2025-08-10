export default function EmployeeCard({ employee }: { employee: any }) {
  const displayName = employee.user_name?.trim()
    ? employee.user_name
    : `Employee #${employee.id}`;

  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="font-semibold text-lg">{displayName}</h3>
      <p className="text-gray-600">Position: {employee.position}</p>
      <p className="text-gray-600">Phone: {employee.phone}</p>
      <p className="text-gray-600">Joined: {employee.date_joined}</p>
      <p className="font-medium text-green-600">
        Salary: ₹{employee.monthly_salary}
      </p>
    </div>
  );
}
