import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import BookAppointment from './components/bookAppointment';
import Appointments from './components/appointments';
import DoctorPatientList from './components/DoctorPatientList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctorpatientlist" element={<DoctorPatientList />} />
      </Routes>
    </Router>
  );
}

export default App;

