import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../axios';


function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'patient',
    specialization: '',
    experience: '',
    age: '',
    gender: 'Male',
    medicalHistory: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      medicalHistory: formData.medicalHistory ? formData.medicalHistory.split(',') : []
    };

    try {
      apiClient.post('/users/register',dataToSend);
      alert('Registration successful!');
      navigate('/');
    } catch(err) {
      console.error(err);
      alert('Error during registration');
    }
  };

  return (
    <div className="container">
      <h2 className="header">Register</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select name="role" onChange={handleChange} value={formData.role}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {formData.role === 'doctor' && (
          <>
            <div className="form-group">
              <label>Specialization:</label>
              <input type="text" name="specialization" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Experience (years):</label>
              <input type="number" name="experience" onChange={handleChange} />
            </div>

          </>
        )}
        {formData.role === 'patient' && (
          <>
            <div className="form-group">
              <label>Age:</label>
              <input type="number" name="age" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select name="gender" onChange={handleChange} value={formData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Medical History (comma separated):</label>
              <input type="text" name="medicalHistory" onChange={handleChange} />
            </div>
          </>
        )}
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
}

export default Register;