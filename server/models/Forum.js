const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: false 
    },
    user:{
        type: String,
        required: true
    },
    _id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', required: true 
    }
}, { timestamps: true }
)

module.exports = mongoose.model('Forum', ForumSchema)