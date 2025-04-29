import express from 'express';
import { saveChatbotUser, getChatbotUsers } from '../controllers/chatbotController.js';

const router = express.Router();

// @route   POST /api/chatbot/user
// @desc    Save or update chatbot user email
router.post('/user', saveChatbotUser);

// @route   GET /api/chatbot/users
// @desc    Get all chatbot users
router.get('/users', getChatbotUsers);

export default router; 