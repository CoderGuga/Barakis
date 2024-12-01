import express from 'express';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import {
    getText,
    getTextbyID,
    createText,
    deleteText,
    updateText,
    completeText
} from '../controllers/textController.js';

const router = express.Router();

router.get('/:id', authenticateUser, getTextbyID);
router.get('/', authenticateUser, getText);
router.post('/', authenticateUser, createText);
router.delete('/:id', authenticateUser, deleteText);
router.patch('/:id/complete', authenticateUser, completeText);
router.patch('/:id', authenticateUser, updateText);

export default router;