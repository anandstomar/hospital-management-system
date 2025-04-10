import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../axios';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    apiClient.get('users/getusers', {
      headers: { Authorization: token }
    })
    .then((res) => setUsers(res.data))
    .catch((err) => console.error(err));
  }, [token]);

  return (
    <div>
      <div className="container">
      <div className="navbar">
        <Link to="/book-appointment" className="nav-link">Book Appointment</Link>
        <Link to="/appointments" className="nav-link">View Appointments</Link>
        <Link to="/doctorpatientlist" className="nav-link">Doctor & Patients</Link>
      </div>


      <h2 className="header">Dashboard</h2>
      <h3>All Users:</h3><br />
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-item">
            <span className="bullet">•</span>
            <span className="user-info">
              {user.username} - {user.role} - ID: {user._id}
            </span>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Dashboard;
