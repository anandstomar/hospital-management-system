import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/users/login',({ username, password }));
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch(err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div>
      <div className="container">
      <h2 className="header">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      </div>
    </div>
  );
}

export default Login;
