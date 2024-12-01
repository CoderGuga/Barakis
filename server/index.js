const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const TextRoutes = require('./routes/textRoutes')
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

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