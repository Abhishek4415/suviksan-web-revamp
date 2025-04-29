import express from 'express';
import { createContact, getContacts } from '../controllers/contactController.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Create a new contact
router.post('/', createContact);

// @route   GET /api/contact
// @desc    Get all contacts
router.get('/', getContacts);

export default router; 