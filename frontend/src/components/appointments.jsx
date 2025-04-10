import React, { useEffect, useState } from 'react';
import apiClient from '../axios';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loadingindicator, setloadingindicator] = useState(false);

  useEffect(() => {
    
    apiClient.get('/appointments/getappointments')
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCancel = async (id) => {
    try {
      setloadingindicator(true)
      const res = await apiClient.patch(`/appointments/${id}/cancel`)
      alert('Appointment cancelled');
      setAppointments(appointments.map(app =>
        app._id === id ? res.data.appointment : app
      ));
    } catch(err) {
      console.error(err);
      alert('Error cancelling appointment');
    }finally{
      setloadingindicator(false);
    }
  };

  return (
    <div>
      <div className="container">
      <h2 className="header">Appointments</h2>
      {loadingindicator && (
       <div className="overlay">
       <div className="loading-spinner"></div>
        <p>Processing...</p>
      </div>
       )}

<ul className="user-list">
  {appointments.map(app => (
    <li key={app._id} className="user-item">
      <span className="bullet"></span>
      <div className="user-info">
        <p>
          <strong>Doctor:</strong> {app.doctor?.username || app.doctor}
        </p>
        <p>
          <strong>Patient:</strong> {app.patient?.username || app.patient}
        </p>
        <p>
          <strong>Date:</strong> {new Date(app.appointmentDate).toLocaleString()}
        </p>
        <p>
          <strong>Status:</strong> {app.status}
        </p>
        {app.status !== 'cancelled' && (
          <button className="button" onClick={() => handleCancel(app._id)}>
            Cancel
          </button>
        )}
      </div>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
}

export default Appointments;
