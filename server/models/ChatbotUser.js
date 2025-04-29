import mongoose from 'mongoose';

const chatbotUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastInteraction: {
    type: Date,
    default: Date.now
  }
});

const ChatbotUser = mongoose.model('ChatbotUser', chatbotUserSchema);

export default ChatbotUser; 