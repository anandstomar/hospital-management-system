import axios from 'axios';

const BASE_URL = 'https://hospital-management-system-xx81.onrender.com/api'; // Replace with your backend URL

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchDoctors = () => apiClient.get('/doctorsPatients/doctors');
export const fetchDoctorById = (doctorId) =>apiClient.get(`/doctorsPatients/doctors/${doctorId}`);
export const fetchPatients = () => apiClient.get('/doctorsPatients/patients');
export const fetchPatientById = (patientId) =>apiClient.get(`/doctorsPatients/patients/${patientId}`);

export default apiClient;
