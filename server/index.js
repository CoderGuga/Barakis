const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')
const ForumModel = require('./models/Forum')

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

app.post('/text', (req, res) => {
    ForumModel.create(req.body)
    .then(Forum => res.json(Forum))
    .catch(err => res.json(err))
})

app.get('/text', async (req, res) => {
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

app.get('/text/:id', async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such message'})
    }
    
    const message = await ForumModel.findById(id)

    if(!message) {
      return res.status(400).json({error: 'No such message'})
    }
  
    res.status(200).json(message)
})

app.delete('/text/:id', async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such message'})
    }
  
    const deletedMessage = await ForumModel.findOneAndDelete({_id: id})
  
    if(!deletedMessage) {
      return res.status(400).json({error: 'No such message'})
    }
  
    res.status(200).json(deletedMessage)
})

app.patch('/text/:id/complete', async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such message'})
      }
    
      try {
        // Update the workout's status to true (completed)
        const updatedMessage = await ForumModel.findByIdAndUpdate(
          id,
          { status: true },
          { new: true } // Return the updated document
        );
    
      if(!updatedMessage) {
        return res.status(400).json({error: 'No such message'})
      }
    
      res.status(200).json(updatedMessage)
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
  })

app.patch('/text/:id', async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such message'})
      }
    
      const updatedMessage = await ForumModel.findOneAndUpdate({_id: id},{
        ...req.body
        })
    
      if(!updatedMessage) {
        return res.status(400).json({error: 'No such message'})
      }
    
      res.status(200).json(updatedMessage)
  })

app.listen(3001, () => {
    console.log('server is running')
})