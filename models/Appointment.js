const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required:	true,
  },
  time: {
    type: String,
    required: true 
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  professional: {
    type: Schema.Types.ObjectId,
    ref: 'Professional',
    required: true
  },
  beforeAppointment: {
    type: String,
    default: '' 
  },
  afterAppointment: {
    type: String,
    default: '' 
  },
  treatment: {
    type: String,
    default: '' 
  },
}, { timestamps: true });


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;