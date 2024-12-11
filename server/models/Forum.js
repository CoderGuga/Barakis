import mongoose from 'mongoose';

const ForumSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: false 
    },
    user: {
        type: String,
        required: true
    },
    _id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    }
}, { timestamps: true });

const ForumModel = mongoose.model('Forum', ForumSchema);
export default ForumModel;