const express = require('express');
const dprouter = express.Router();
const User = require('../Models/userSchema'); 
const auth = require('../Middleware/authentication');

dprouter.get('/doctors', auth ,async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

dprouter.get('/doctors/:id',auth , async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.params.id, role: 'doctor' });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

dprouter.get('/patients',auth ,async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' });
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

dprouter.get('/patients/:id' ,auth , async (req, res) => {
  try {
    const patient = await User.findOne({ _id: req.params.id, role: 'patient' });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = dprouter;
