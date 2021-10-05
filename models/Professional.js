const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalSchema = new Schema({
  nome: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  telefone: {
    type: Number,
    required: true
  },
  especialidades: {
    type: String,
    required: true 
  },
  pacientes: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'   
  },
  atendimentos: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }
}, { timestamps: true });


const Professional = mongoose.model('Professional', professionalSchema);

module.exports = Professional;