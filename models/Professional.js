const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalSchema = new Schema({
  name: {
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
  phoneNumber: {
    type: String,
    required: true
  },
  knownTechniques: {
    type: String,
    required: true 
  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  profilePicture: {
    type: String,
    default: 'https://res.cloudinary.com/dk452062g/image/upload/v1635374273/MHC%20images/ndhykztaxdkcfn0ytw9q.jpg'
  }
}, { timestamps: true });


const Professional = mongoose.model('Professional', professionalSchema);

module.exports = Professional;