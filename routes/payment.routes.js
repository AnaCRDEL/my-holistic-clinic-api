const { Router } = require('express');
const Payment = require('../models/Payment');
const router = Router();

router.get('/', async (request, response) => {
    try {
        const payments = await Payment.find();
        response.status(200).json(payments);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.post('/', async (request, response) => {
    try {
        const newPayment = await Payment.create(request.body);
        response.status(200).json(newPayment)
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(id, request.body, { new: true });
        response.status(200).json(updatedPayment);
    } catch (error) {
        console.log(error)
        response.status(500).json({ message: 'ServerError', error });
    }
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        await Payment.findByIdAndDelete(id);
        response.status(200).json('Successfully deleted')
    } catch (error) {
        response.status(500).json({ message: 'ServerError', error });
    }
});

module.exports = router;