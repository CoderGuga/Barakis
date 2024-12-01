import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import TextRoutes from './routes/textRoutes.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';

dotenv.config();    

const app = express()
app.use(express.json())

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5000", // Adjust for local dev
        credentials: true,
    })
);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.use('/tasks', TextRoutes)
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})