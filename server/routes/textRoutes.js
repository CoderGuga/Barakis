const express = require('express')
const {
    getText,
    getTextbyID,
    createText,
    deleteText,
    updateText,
    completeText
} = require('../controllers/textController')

const router = express.Router()

router.get('/:id', getTextbyID)
router.get('/', getText)
router.post('/', createText)
router.delete('/:id', deleteText)
router.patch('/:id/complete', completeText)
router.patch('/:id', updateText)

module.exports = router