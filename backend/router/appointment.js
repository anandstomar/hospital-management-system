const express = require('express');
const appointmentsRouter = express.Router();
const Appointment = require('../Models/AppointmentSchema');
const auth = require('../Middleware/authentication');

appointmentsRouter.post('/postappointments',auth , async (req, res) => {
  try {
    const { doctor, patient, appointmentDate, reason } = req.body;
    const newAppointment = new Appointment({
      doctor,
      patient,
      appointmentDate,
      reason,
      status: 'pending'
    });
    const savedAppointment = await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: savedAppointment });
  } catch(err) {
    console.error('Error booking appointment:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

appointmentsRouter.patch('/:id/cancel',auth , async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment cancelled successfully', appointment: updatedAppointment });
  } catch(err) {
    console.error('Error cancelling appointment:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

appointmentsRouter.get('/getappointments',auth , async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctor patient');
    res.json(appointments);
  } catch(err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = appointmentsRouter;
