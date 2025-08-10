// src/pages/admin/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/auth/dashboard/admin/');
        setMessage(res.data.message);
      } catch (err) {
        setMessage('Failed to fetch admin dashboard.');
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;
