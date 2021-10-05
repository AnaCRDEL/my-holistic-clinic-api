const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true 
  },
  valor: {
    type: Number,
    required: true 
  },
  referente: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    required: true
  }
}, { timestamps: true });


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;