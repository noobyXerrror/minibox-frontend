// src/pages/auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  try {
    const res = await api.post('/api/auth/login/', {
      email: form.email,
      password: form.password
    });

    // No need to store token manually; cookies are already set
    const { role} = res.data;
     
    // Redirect based on role
    switch (role) {
      case 'employee':
        navigate('/employee/dashboard');
        break;
      case 'HR':
        navigate('/hr/dashboard');
        break;
      case 'ADMIN':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/');
    }
  } catch (err) {
    setError('Invalid credentials.');
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-medium hover:bg-blue-700 transition"
        >
          Log In
        </button>
        <p className="text-center text-sm">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

