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

module.exports = router;