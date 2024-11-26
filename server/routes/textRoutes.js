const express = require('express')
const { authenticateUser } = require('../middlewares/authMiddleware');
const {
    getText,
    getTextbyID,
    createText,
    deleteText,
    updateText,
    completeText
} = require('../controllers/textController')

const router = express.Router()

router.get('/:id', authenticateUser, getTextbyID)
router.get('/', authenticateUser, getText)
router.post('/', authenticateUser, createText)
router.delete('/:id', authenticateUser, deleteText)
router.patch('/:id/complete', authenticateUser, completeText)
router.patch('/:id', authenticateUser, updateText)

module.exports = router