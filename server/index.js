const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')
const ForumModel = require('./models/Forum')
const TextRoutes = require('./routes/textRoutes')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/employee')

app.post('/login', (req, res) => {
    const {name, password} = req.body
    EmployeeModel.findOne({name:name})
    .then(user => {
        if(user){
        if(user.password === password) {
            res.json('Success')
        }
        else{
            res.json('the password is incorrect')
        }
    }
    else {
        res.json('No such user')
    }
    })
})

app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.use('/text', TextRoutes)


app.get('/items', async (req, res) => {
  const { status } = req.query;

  const query = status ? { status } : {};

  try{
      const messages = await ForumModel.find(query).sort({createdAt: -1})

      res.status(200).json(messages)
  }
  catch (error) {
      res.status(500).json({ error: error.message });
  }
})









app.listen(3001, () => {
    console.log('server is running')
})