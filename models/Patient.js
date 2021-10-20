const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  codigoCliente: {
    type: Number
  },
  nome: {
    type: String,
    required: true 
  },
  telefone: {
    type: String,
    required: true
  },
  dataNascimento: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  endereço: {
    type: String,
    required: true
  },
  atendimentos: {
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  sintomas: {
    type: String,
    required: true 
  },
  pagamentos: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'   
  }
}, { timestamps: true });


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;