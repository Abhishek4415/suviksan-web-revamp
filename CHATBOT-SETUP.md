# Suviksan Chatbot Setup Guide

This document explains how to set up and configure the Gemini-powered chatbot for the Suviksan website.

## Overview

The chatbot uses Google's Gemini API to provide intelligent responses based on Suviksan's company information, services, and FAQs. It has been designed to:

- Collect user email for follow-up
- Answer questions about company services
- Provide contact information
- Assist with general inquiries
- Direct users to the appropriate resources

## Setup Steps

### 1. Get a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create or sign in to your Google account
3. Create a new API key
4. Copy the API key value

### 2. Set Up Environment Variables

1. Rename `env.example` to `.env`
2. Replace `your_gemini_api_key_here` with your actual Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 3. Start the Development Server

Run the following commands:

```sh
npm install
npm run dev
```

## Customizing the Chatbot

### Company Information

The chatbot pulls information from `src/lib/company-data.ts`. You can modify this file to update:

- Company details
- Services information
- Upcoming events
- Client testimonials
- FAQs

### Chatbot Behavior

The core logic for the chatbot is in `src/lib/chatbot-service.ts`. You can customize:

- The system prompt in `initializeChatContext()`
- Default responses in `getMockResponse()`
- Message handling in `sendMessageToGemini()`

### Appearance and UI

The chatbot component is in `src/components/ChatBot.tsx`. You can modify:

- Colors and styling
- Message layout
- Input behavior
- Animation effects

## How It Works

1. When a user opens the chatbot, they're prompted to enter their email
2. After email submission, the chatbot accepts free-form questions
3. Questions are sent to the Gemini API with context about Suviksan
4. Gemini generates responses based on the company data and conversation history
5. Responses are displayed to the user

## Testing Without an API Key

If no API key is provided, the chatbot will operate in "mock mode" with predefined responses based on keywords. This is useful for UI testing without consuming API credits.

## Troubleshooting

- **API Error Responses**: Check the browser console for detailed error messages
- **Styling Issues**: Make sure Tailwind CSS is properly configured
- **Environment Variables**: Ensure `.env` file is in the root directory and contains the correct API key

## Production Deployment

When deploying to production:

1. Make sure the Gemini API key is securely set as an environment variable on your hosting platform
2. Ensure proper error handling is in place for production use
3. Consider implementing rate limiting to prevent API quota exhaustion

For any questions, refer to the [Google Gemini API documentation](https://ai.google.dev/docs/gemini_api/overview). 