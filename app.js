require('dotenv').config();

const express = require('express');
const connectDb = require('./config/db.config');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const professionalRoutes = require('./routes/professional.routes');
const patientsRoutes = require('./routes/patient.routes');
const appointmentsRoutes = require('./routes/appointment.routes');
const authMiddleware = require('./middlewares/auth.middleware');

connectDb();

const app = express();

app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: ['https://myholisticclinic.herokuapp.com/']
    })
);

app.use('/auth', authRoutes);

app.use(authMiddleware);

app.use('/professionals', professionalRoutes);
app.use('/patients', patientsRoutes);
app.use('/appointments', appointmentsRoutes);

app.listen(process.env.PORT, () => console.log(`Server listen on Port ${process.env.PORT}`));