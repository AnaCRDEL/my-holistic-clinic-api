const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  data: {
    type: Date,
    required:	true,
  },
  horário: {
    type: Number,
    required: true 
  },
  profissional: {
    type: Schema.Types.ObjectId,
    ref: 'Professional',
    required: true
  },
  paciente: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  preAtendimento: {
    type: String,
    default: '' 
  },
  posAtendimento: {
    type: String,
    default: '' 
  },
  tratamento: {
    type: String,
    default: '' 
  },
}, { timestamps: true });


const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;