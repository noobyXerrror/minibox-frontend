// src/services/api.ts
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // change this to your backend
   withCredentials: true, 
});

// Attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// HR Dashboard APIs
export const fetchAllEmployees = async () => {
  const response = await API.get("/employees/", { withCredentials: true });
  
  return response.data;
};

export const getAvailableUsers = async () => {
  const res = await API.get(`/auth/available-users/`, { withCredentials: true });
  return res.data;
};

export const addEmployee = async (employeeData: any) => {
    const payload = {
    user_email: employeeData.email,
    phone: employeeData.phone,
    position: employeeData.position,
    is_active: employeeData.is_active,
    monthly_salary: employeeData.monthly_salary,
  };
  const res = await API.post(`/employees/`, payload, { withCredentials: true });
  return res.data;
};
export const generatePayroll = async () => {
  const response = await API.post(`/payroll/generate/`);
  return response.data;
};

// Employee Dashboard APIs
export const fetchEmployeeDashboard = async () => {
  const response = await API.get("/api/employees/");
  return response.data;
};

export const markAttendance = async () => {
  const response = await API.post("/attendance/mark/");
  return response.data;
};


export default API;
