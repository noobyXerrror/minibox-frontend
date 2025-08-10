import { useState, useEffect } from 'react';
import { addEmployee, getAvailableUsers } from '../../../services/api';

type AvailableUser = { id: number; name?: string; email: string };

type FormData = {
  email: string;
  phone: string;
  position: string;
  is_active: boolean;
  monthly_salary: number;
};

export default function AddEmployeeForm({ onEmployeeAdded }: { onEmployeeAdded?: () => void }) {
  const [form, setForm] = useState<FormData>({
    email: '',
    phone: '',
    position: '',
    is_active: true,
    monthly_salary: 0,
  });

  const [users, setUsers] = useState<AvailableUser[]>([]);
  const [selectValue, setSelectValue] = useState<string>(''); // email or "__manual__"

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAvailableUsers();
        // backend might return array or object; normalize:
        const list = Array.isArray(data) ? data : data.users ?? [];
        setUsers(list);
      } catch (err) {
        console.error('Error fetching available users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'select_user') {
      setSelectValue(value);
      if (value === '__manual__') {
        // keep form.email as-is (allow typing)
        setForm(prev => ({ ...prev, email: '' }));
      } else {
        // value is the user's email
        setForm(prev => ({ ...prev, email: value }));
      }
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'monthly_salary'
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // backend expects user_email (see serializer)
      await addEmployee({
        email: form.email,
        phone: form.phone,
        position: form.position,
        is_active: form.is_active,
        monthly_salary: form.monthly_salary,
      });
      alert('Employee added!');
      setForm({ email: '', phone: '', position: '', is_active: true, monthly_salary: 0 });
      setSelectValue('');
      if (onEmployeeAdded) onEmployeeAdded();
    } catch (err) {
      console.error('Failed to add employee:', err);
      alert('Error adding employee — check console/network for details');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
      {/* Select existing user OR choose manual entry */}
      <label className="block">
        Pick existing user (or choose "Enter manually"):
        <select
          name="select_user"
          value={selectValue}
          onChange={handleFieldChange}
          className="border p-2 w-full mt-1"
        >
          <option value="">-- Select a user (optional) --</option>
          {users.map(u => (
            <option key={u.id} value={u.email}>
              {u.name ? `${u.name} (${u.email})` : u.email}
            </option>
          ))}
          <option value="__manual__">Enter email manually</option>
        </select>
      </label>

      {/* Email input (always editable so HR can tweak even after selecting) */}
      <input
        name="email"
        placeholder="Employee email (select above or type)"
        onChange={handleFieldChange}
        value={form.email}
        className="border p-2 w-full"
        required
      />

      {/* Phone */}
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleFieldChange}
        value={form.phone}
        className="border p-2 w-full"
        required
      />

      {/* Position */}
      <input
        name="position"
        placeholder="Position"
        onChange={handleFieldChange}
        value={form.position}
        className="border p-2 w-full"
        required
      />

      {/* Is Active */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_active"
          checked={form.is_active}
          onChange={handleFieldChange}
        />
        Is Active
      </label>

      {/* Monthly Salary */}
      <input
        name="monthly_salary"
        type="number"
        placeholder="Monthly Salary"
        onChange={handleFieldChange}
        value={form.monthly_salary || ''}
        className="border p-2 w-full"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
