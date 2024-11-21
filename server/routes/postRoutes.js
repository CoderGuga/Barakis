const express = require('express');
const { createTask, getTasks } = require('../controllers/postController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, createTask);
router.get('/', authenticateUser, getTasks);

module.exports = router;
