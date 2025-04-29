import ChatbotUser from '../models/ChatbotUser.js';

// @desc    Save or update chatbot user email
// @route   POST /api/chatbot/user
// @access  Public
export const saveChatbotUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    // Try to find existing user
    let user = await ChatbotUser.findOne({ email });

    if (user) {
      // Update last interaction time
      user.lastInteraction = new Date();
      await user.save();
    } else {
      // Create new user
      user = await ChatbotUser.create({ email });
    }

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in saveChatbotUser:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get all chatbot users
// @route   GET /api/chatbot/users
// @access  Private (admin only)
export const getChatbotUsers = async (req, res) => {
  try {
    const users = await ChatbotUser.find().sort({ lastInteraction: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error in getChatbotUsers:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 