require('dotenv').config();

const express = require('express');
const connectDb = require('./config/db.config');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const professionalRoutes = require('./routes/professional.routes');
const patientsRoutes = require('./routes/patient.routes');
const disabledPatientsRoutes = require('./routes/disabledPatient.routes')
const appointmentsRoutes = require('./routes/appointment.routes');
const paymentsRoutes = require('./routes/payment.routes');
const authMiddleware = require('./middlewares/auth.middleware');

connectDb();

const app = express();

app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000']
    })
);

app.use('/auth', authRoutes);

app.use(authMiddleware);

app.use('/professionals', professionalRoutes);
app.use('/patients', patientsRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/payments', paymentsRoutes);
app.use('/disabledPatients', disabledPatientsRoutes)

app.listen(process.env.PORT, () => console.log(`Server listen on Port ${process.env.PORT}`));