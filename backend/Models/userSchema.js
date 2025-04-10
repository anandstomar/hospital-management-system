const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,          
    required: true,       
    unique: true,                          
  },
  password: {
    type: String,         
    required: true         
  },
  createdAt: {
    type: Date,
    default: Date.now      
  },
  
  role: {
    type: String,
    required: true,
    enum: ["doctor", "patient"]
  },


  // Fields for doctors:
  specialization: {
    type: String,
    
  },
  experience: {
    type: Number,
    
  },
  isApproved: {
    type: Boolean,
    default: false 
  },


  // Fields for patients:
  age: {
    type: Number,
   
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
   
  },
  medicalHistory: {
    type: [String], 
    default: []
  }
});

module.exports = model('Patients&Doctors', userSchema);
