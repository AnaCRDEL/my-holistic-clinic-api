const { Router } = require('express');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Professional = require('../models/Professional');
const router = Router();

router.get('/', async (request, response) => {
    try {
        const appointments = await Appointment.find().populate('patient', 'name').populate('professional', 'name');
        appointments.sort((a, b) => {
            const aDate = new Date(a.dateTime)
            const bDate = new Date(b.dateTime)
            if (aDate > bDate) {
                return 1
            }
            if (aDate < bDate) {
                return -1
            }
            return 0
        })
        response.status(200).json(appointments);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const appointment = await Appointment.findById(id).populate('patient', 'name').populate('professional', 'name');
        response.status(200).json(appointment);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.post('/', async (request, response) => {
    try {
        const newAppointment = await Appointment.create(request.body);
        await Patient.findByIdAndUpdate(request.body.patient, { $push: { appointments: newAppointment._id } })
        await Professional.findByIdAndUpdate(request.body.professional, { $push: { appointments: newAppointment._id } })
        response.status(200).json(newAppointment)
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    for (const prop in request.body) {
        if (prop === 'dateTime' || prop === 'patient' || prop === 'professional') {
            if( request.body[prop] === '' || request.body[prop] === null) {
                response.status(500).json({ message: 'ServerError'});
                return
            }     
        }
    }
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, request.body, { new: true });
        response.status(200).json(updatedAppointment);
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        await Appointment.findByIdAndDelete(id);
        response.status(200).json('Successfully deleted')
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

module.exports = router;