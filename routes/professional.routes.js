const { Router } = require('express');
const Professional = require('../models/Professional');
const router = Router();

router.get('/', async (request, response) => {
    try {
        const professionals = await Professional.find();
        response.status(200).json(professionals);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const professional = await Professional.findById(id).populate('appointments', 'date time');;
        response.status(200).json(professional);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const updatedProfessional = await Professional.findByIdAndUpdate(id, request.body, { new: true });
        response.status(200).json(updatedProfessional);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        await Professional.findByIdAndDelete(id);
        response.status(200).json('Successfully deleted')
    } catch (error) {
        console.log(error)
        response.status(500).json(console.log(error));
    }
});

module.exports = router;