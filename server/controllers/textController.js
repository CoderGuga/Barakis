import mongoose from 'mongoose';
import ForumModel from '../models/Forum.js';

export const getText = async (req, res) => {
    const { status } = req.query;

    const query = status ? { status } : {};

    try {
        const messages = await ForumModel.find(query).sort({ createdAt: -1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTextbyID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such message' });
    }

    try {
        const message = await ForumModel.findById(id);

        if (!message) {
            return res.status(400).json({ error: 'No such message' });
        }

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createText = async (req, res) => {
    try {
        const forum = await ForumModel.create(req.body);
        res.status(201).json(forum);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteText = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such message' });
    }
  
    try {
        const deletedMessage = await ForumModel.findOneAndDelete({ _id: id });
  
        if (!deletedMessage) {
            return res.status(400).json({ error: 'No such message' });
        }
  
        res.status(200).json(deletedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateText = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such message' });
    }
  
    try {
        const updatedMessage = await ForumModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
  
        if (!updatedMessage) {
            return res.status(400).json({ error: 'No such message' });
        }
  
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const completeText = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such message' });
    }
  
    try {
        const message = await ForumModel.findById(id);
  
        const updatedMessage = await ForumModel.findOneAndUpdate({ _id: id }, { status: !message.status }, { new: true });
  
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
