import { generatePayroll } from '../services/api';

export default function PayrollButton() {
  const handleClick = async () => {
    await generatePayroll();
    alert('Payroll Generated!');
  };

  return (
    <button onClick={handleClick} className="bg-green-600 text-white px-4 py-2 rounded">
      Generate Payroll
    </button>
  );
}
