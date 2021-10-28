const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patientCode: {
    type: Number
  },
  name: {
    type: String,
    required: true 
  },
  phoneNumber: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  symptoms: {
    type: String,
    required: true 
  },
  payments: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'   
  },
  isActive: {
    type: Boolean,
    default: true
  },
  deactivationReason: {
    type: String,
  }
}, { timestamps: true });


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;