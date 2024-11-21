const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')
const ForumModel = require('./models/Forum')
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express()
// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/users', userRoutes);
app.use('/tasks', postRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Start server
app.listen(3001, () => {
    console.log('server is running')
})