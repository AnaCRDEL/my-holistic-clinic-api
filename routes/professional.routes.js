const { Router } = require('express');
const router = Router();
const Professional = require('../models/Professional');
const uploadImage = require('../config/cloudinary.config')

router.get('/', async (request, response) => {
    try {
        const professionals = await Professional.find();
        professionals.sort((a, b) => {
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
        response.status(200).json(professionals);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const professional = await Professional.findById(id).populate('appointments', 'dateTime');;
        response.status(200).json(professional);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    for (const prop in request.body) {
        if( request.body[prop] === '' || request.body[prop] === null) {
          response.status(500).json({ message: 'ServerError'});
          return
        } 
    }
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

router.post('/:id/profile-picture', uploadImage.single('image'), async (request, response) => {
    const { id } = request.params;
    const { path } = request.file
    try {
        const updatedProfessional = await Professional.findByIdAndUpdate(id, {profilePicture: path}, { new: true });
        response.status(200).json(updatedProfessional);
    } catch (error) {
        response.status(500).json(console.log(error))
    }
});

module.exports = router;