const express = require('express');
const app = express();
const moongoose = require('mongoose');
const PORT = 3001;
const MONGODB_URL = 'mongodb+srv://Ananddb:Anand2003@cluster0.hhg4k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
app.use(express.json());
const cors = require('cors');
const usersRouter = require('./router/register');
const appointmentsRouter = require('./router/appointment');
const doctorsPatientsRoutes = require("./router/doctor&patients")


app.use(
    cors({
        origin: ["http://localhost:5173","https://hospital-management-system-one-zeta.vercel.app/"], 
        credentials: true,
    })
);


app.use('/api/users', usersRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/doctorsPatients', doctorsPatientsRoutes);

app.get('/', (req, res) => {
    res.send('Hello, welcome to the react backend!');
});

moongoose.connect(MONGODB_URL, {
})
.then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("Database connection failed:", error);7
});
