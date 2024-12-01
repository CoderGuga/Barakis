import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import TextRoutes from './routes/textRoutes'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes';
import path from 'path';

dotenv.config();    

const app = express()
app.use(express.json())

const __dirname = path.resolve();

app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

app.use('/tasks', TextRoutes)
app.use('/users', userRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})