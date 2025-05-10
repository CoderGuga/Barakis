import User from '../models/Employee.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user){
    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id, username: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ success: true, user, token });
    }
    if (user)
    {
      res.status(400).json({ message: 'email taken' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login an existing user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    console.log(user.name);
    const token = jwt.sign({ id: user._id, username: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
