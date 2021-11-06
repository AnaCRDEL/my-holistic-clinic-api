# My Holistic Clinic API

Back-end of My Holistic Clinic Application, with a RESTful API. 

##### Front-end repository link: [my-holistic-clinic](https://github.com/AnaCRDEL/my-holistic-clinic)
##### Website link: [myholisticclinic.herokuapp](https://myholisticclinic.herokuapp.com/)
#

## FEATURES:
Public Routes:
- Login users (professionals).

Authorized Routes:
- Create users (professionals) and patients;
- See and uptade patients and professionals information;
- Create and delete appointments;
- See and update appointments information.

## TECHNOLOGIES:
My Holistic Clinic API server uses:
- Nodejs;
- Express;
- Json web token;
- Bcryptjs.

## USAGE:
Online: [My Holistic Clinic API](https://myholisticclinicapi.herokuapp.com/)

-or-

Local:

- Clone this repo;
- `npm i `;
- Set your environment variables with:
```
PORT=         // use the one you prefer
DB_URI=       // your local mongoDB storage or AtlasDB
SECRET_JWT=   // your own secret`
```
- Use `npm start` (node) or `npm run dev` (nodemon) to start application at:
```
http://localhost:<PORT>
```

## Endpoints:
| METHOD | ENDPOINT¹ | PAYLOAD | RESPONSE | ACTION |
| ------ | ----------------- | -------------------------------- | --------------- | --------------------------------------------------------------------------------- |
| POST | /auth/signup | { name², email², password², phoneNumber², knownTechniques², appointments, profilePicture } | { message } | Creates a user in DB |
| POST | /auth/login | { email², password² } | { user, token } | Creates a token for the user to access private routes |
| GET | /professionals | - | { professionals } | Get all professionals |
| GET | /professionals/:id | - | { professional } | Get a professional by ID |
| PUT | /professionals/:id | { professional } | { updatedProfessional } | Updates a professional |
| DELETE | /professionals/:id | - | { message } | Deletes a professional |
| GET | /patients | - | { patients } | Get all patients |
| GET | /patients/:id | - | { patient } | Get a patient by ID |
| POST | /patients | { name², phoneNumber², birthDate², email², address², symptoms², payments, isActive, deactivationReason} | { newPatient } | Creates a new patient |
| PUT | /patients/:id | { patient } | { updatedPatient } | Updates a patient |
| DELETE | /patients/:id | - | { message } | Deletes a patient |
| GET | /appointments | - | { appointments } | Get all appointments |
| GET | /appointments/:id | - | { appointment } | Get a appointment by ID |
| POST | /appointments | { dateTime², patient², professional², beforeAppointment, afterAppointment, treatment } | { newAppointment } | Creates a new appointment |
| PUT | /appointments/:id | { appointment } | { updatedAppointment } | Updates a appointment |
| DELETE | /appointments/:id | - | { message } | Deletes a appointment |

¹: all endpoints except the ones starting with `/auth` need to use a token (bearer) authorization header.
²: required field.

## Response fields:
```javascript
message: String;

professional: {
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    knownTechniques: String,
    appointments: [ ObjectId ],
    profilePicture: String
};

token: String;

patient: {
    name: String,
    phoneNumber: String,
    birthDate: Date, 
    email: String,
    address: String,
    appointments: [ ObjectId ],
    symptoms: String,
    isActive: Boolean,
    deactivationReason: String,
};

appointment: {
    dateTime: String,
    patient: ObjectId,
    professional: ObjectId,
    beforeAppointment: String,
    afterAppointment: String,
    treatment: String
};
```