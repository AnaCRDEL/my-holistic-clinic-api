const { Router } = require('express');
const Patient = require('../models/Patient');
const router = Router();

router.get('/', async (request, response) => {
    try {
        const patients = await Patient.find();
        patients.sort((a, b) => {
            const aName = a.name.toLowerCase()
            const bName = b.name.toLowerCase()
            if (aName > bName) {
                return 1
            }
            if (aName < bName) {
                return -1
            }
            return 0
        })
        response.status(200).json(patients);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const patient = await Patient.findById(id).populate('appointments', 'dateTime');
        response.status(200).json(patient);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.post('/', async (request, response) => {
    try {
        const newPatient = await Patient.create(request.body);
        response.status(200).json(newPatient)
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    for (const prop in request.body) {
        if (prop != 'deactivationReason') {
            if( request.body[prop] === '' || request.body[prop] === null) {
                response.status(500).json({ message: 'ServerError'});
                return
            }     
        }
    }
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, request.body, { new: true });
        response.status(200).json(updatedPatient);
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        await Patient.findByIdAndDelete(id);
        response.status(200).json('Successfully deleted')
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

module.exports = router;