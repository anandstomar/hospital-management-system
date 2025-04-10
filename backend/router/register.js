const express = require('express');
const usersRouter = express.Router();
const Users = require('../Models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET || 'my_super_secret_key'
const auth = require('../Middleware/authentication');

usersRouter.post('/register' , async (req, res) => {
  try {
    const { username, password, role, specialization, experience, age, gender, medicalHistory } = req.body;
    console.log('Received registration data:', req.body);
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username,
      password: hashedPassword,
      role,
      specialization: role === 'doctor' ? specialization : undefined,
      experience: role === 'doctor' ? experience : undefined,
      age: role === 'patient' ? age : undefined,
      gender: role === 'patient' ? gender : undefined,
      medicalHistory: role === 'patient' ? medicalHistory : undefined,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch(err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

usersRouter.post('/login', async (req, res) => {
  try {

    const { username, password } = req.body;
    console.log('Received login data:', req.body);

    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      jwtSecret,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } catch(err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

usersRouter.get('/users' ,auth , async (req, res) => {
  res.send('Hello, welcome to the user backend!');
});

usersRouter.get('/getusers', async (req, res) => {
  try {
    const { role } = req.query;
    let query = {};
    if (role) {
      query.role = role;
    }
  
    const users = await Users.find(query).lean();

    const usersWithId = users.map(user => ({
      ...user,
      id: user._id.toString()
    }));

    res.json(usersWithId);
  } catch(err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = usersRouter;
