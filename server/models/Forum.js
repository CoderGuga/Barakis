const mongoose = require('mongoose')

const ForumSchema = new mongoose.Schema({
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