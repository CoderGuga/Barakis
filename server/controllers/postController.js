const Task = require('../models/Forum');

// Create a task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({ title, description, creatorId: req.user.id });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('creatorId');
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};