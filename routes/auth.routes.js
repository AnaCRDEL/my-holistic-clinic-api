const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Professional = require('../models/Professional');

const router = Router();

function validateEmail(email) {
    const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
    return re.test(String(email).toLowerCase());
}

router.post('/signup', async (request, response) => {
    const { nome, email, password, telefone, especialidades } = request.body;
    try {
        if (!validateEmail(email)) {
        throw new Error('invalid email')
        }
        const professionalEmail = await Professional.findOne({ email });
        if (professionalEmail) {
        throw new Error('email already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newProfessional = await Professional.create({
          nome,
          email,
          password: passwordHash,
          telefone,
          especialidades
        });
        response.status(201).json({
            nome: newProfessional.nome,
            email: newProfessional.email,
          });
    } catch (error) {
            response.status(500).json({message: 'Error while creating user', error: error.message });
    }
});

router.post('/login', async (request, response) => {
  const { email, password } = request.body;
  try {
    const professional = await Professional.findOne({ email });
    if (!professional) {
      throw new Error('email not found');
    }
    const compareHash = bcrypt.compareSync(password, professional.password);

    if (!compareHash) {
      throw new Error('email or password incorrect');
    }
    const payload = {
      id: professional.id,
      email: professional.email,
    };

    const token = jwt.sign(
      payload,
      process.env.SECRET_JWT,
      { expiresIn: '1day' },
    );

    response.status(200).json({ payload, token });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

module.exports = router;