import Contact from '../models/Contact.js';
import { sendContactEmail } from '../utils/emailService.js';

// @desc    Create a new contact submission
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Please provide name, email and message' });
    }

    // Create contact record in database
    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      message
    });

    // Send email notification
    try {
      await sendContactEmail({
        name,
        email,
        phone,
        company,
        message
      });
      console.log('Email notification sent successfully');
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Continue with the response even if email fails
      // In a production environment, you might want to log this to a monitoring service
    }

    res.status(201).json({
      success: true,
      data: contact,
      emailSent: true
    });
  } catch (error) {
    console.error('Error in createContact:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (in production, you would add authentication)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 