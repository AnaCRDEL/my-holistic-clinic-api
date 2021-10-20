const { Router } = require('express');
const disabledPatient = require('../models/DisabledPatient');
const router = Router();

router.get('/', async (request, response) => {
    try {
        const patients = await disabledPatient.find();
        response.status(200).json(patients);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const patient = await disabledPatient.findById(id);
        response.status(200).json(patient);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.post('/', async (request, response) => {
    try {
        const newPatient = await disabledPatient.create(request.body);
        response.status(200).json(newPatient)
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const updatedPatient = await disabledPatient.findByIdAndUpdate(id, request.body, { new: true });
        response.status(200).json(updatedPatient);
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        await disabledPatient.findByIdAndDelete(id);
        response.status(200).json('Successfully deleted')
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

module.exports = router;