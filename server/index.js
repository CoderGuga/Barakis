const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')
const ForumModel = require('./models/Forum')
const TextRoutes = require('./routes/textRoutes')
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();    

const app = express()
app.use(express.json())

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.use('/tasks', TextRoutes)
app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log('server is running')
})