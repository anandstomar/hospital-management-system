const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const appointmentSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Patients&Doctors", 
    required: true
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patients&Doctors", 
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = model("Appointment", appointmentSchema);

