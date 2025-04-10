import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../axios';

function BookAppointment() {
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState({
    doctor: '',
    patient: '',
    appointmentDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/appointments/postappointments', appointmentData);
      alert('Appointment booked successfully!');
      navigate('/appointments');
    } catch(err) {
      console.error(err);
      alert('Error booking appointment');
    }
  };

  return (
    <div>
      <div className="container">
      <h2 className="header">Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Doctor ID:</label>
          <input type="text" name="doctor" onChange={handleChange} required />
        </div>
        <br />
        <div className="form-group">
          <label>Patient ID:</label>
          <input type="text" name="patient" onChange={handleChange} required />
        </div>
        <br />
        <div className="form-group">
          <label>Appointment Date:</label>
          <input type="datetime-local" name="appointmentDate" onChange={handleChange} required />
        </div>
        <br />
        <div className="form-group">
          <label>Reason:</label>
          <textarea name="reason" onChange={handleChange}></textarea>
        </div>
        <br />
        <button type="submit" className="button">Book Appointment</button>
      </form>
      </div>
    </div>
  );
}

export default BookAppointment;
