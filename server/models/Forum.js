const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', required: true 
    },
    text:{
        type:String,
        required:true
    }, 
    status:{
        type:Boolean,
        required:true
    }
}, { timestamps: true }
)

module.exports = mongoose.model('Forum', ForumSchema)