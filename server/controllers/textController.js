const mongoose = require('mongoose')
const ForumModel = require('../models/Forum')
const jwtDecode = require('jwt-decode')

const getText = async (req, res) => {
    const { status } = req.query;

    const query = status ? { status } : {};

    try{
        const messages = await ForumModel.find(query).sort({createdAt: -1})

        res.status(200).json(messages)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTextbyID = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such message'})
    }

    try {
        const message = await ForumModel.findById(id)

        if(!message) {
            return res.status(400).json({error: 'No such message'})
        }

        res.status(200).json(message)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createText = (req, res) => {
    ForumModel.create(req.body)
    .then(Forum => res.json(Forum))
    .catch(err => res.json(err))
}

const deleteText = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such message'})
    }
  
    const deletedMessage = await ForumModel.findOneAndDelete({_id: id})
  
    if(!deletedMessage) {
      return res.status(400).json({error: 'No such message'})
    }
  
    res.status(200).json(deletedMessage)
}

const updateText = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such message'})
    }
  
    const updatedMessage = await ForumModel.findOneAndUpdate({_id: id}, req.body, {new: true})
  
    if(!updatedMessage) {
      return res.status(400).json({error: 'No such message'})
    }
  
    res.status(200).json(updatedMessage)
}

const completeText = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such message'})
      }
    
      try {
        const message = await ForumModel.findById(id)
  
        const updatedMessage = await ForumModel.findOneAndUpdate({_id: id}, {status: !message.status}, {new: true})
  
        res.status(200).json(updatedMessage)
      }
      catch (error) {
        res.status(500).json({ error: error.message });
      }
}



module.exports = {
    getText,
    getTextbyID,
    createText,
    deleteText,
    updateText,
    completeText
}

