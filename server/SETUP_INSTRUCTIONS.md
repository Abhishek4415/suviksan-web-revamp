# Setting Up Your Contact Form Backend

This document provides step-by-step instructions for setting up the backend server for the contact form, which will store submissions in MongoDB Atlas and send email notifications using SendGrid.

## Quick Start

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/suviksan
   NODE_ENV=development

   # Email Configuration (SendGrid)
   SENDGRID_API_KEY=your_sendgrid_api_key
   FROM_EMAIL=contact@yourdomain.com
   CONTACT_EMAIL=siyaabhi441@gmail.com
   ```

3. Replace the placeholder values with your actual credentials.

4. Start the server:
   ```bash
   npm run dev
   ```

## Setting Up SendGrid for Email Notifications

The backend uses SendGrid to send email notifications when someone submits the contact form. Here's how to set it up:

1. **Create a SendGrid Account**:
   - Sign up for a free account at [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
   - The free tier includes 100 emails per day, which is sufficient for most small websites

2. **Create an API Key**:
   - Log in to your SendGrid dashboard
   - Navigate to Settings → API Keys
   - Click "Create API Key"
   - Name it (e.g., "Suviksan Contact Form")
   - Choose "Full Access" or "Restricted Access" with at least Mail Send permissions
   - Copy the generated API key (you won't be able to see it again!)

3. **Set Up Sender Authentication**:
   - SendGrid requires sender verification to prevent spam
   - Go to Settings → Sender Authentication
   - You can either:
     - Verify a Single Sender (quickest option)
     - Set up Domain Authentication (more professional, requires DNS access)
   - Follow the on-screen instructions to complete the verification

4. **Update Your .env File**:
   - Set `SENDGRID_API_KEY` to your API key
   - Set `FROM_EMAIL` to your verified sender email
   - Set `CONTACT_EMAIL` to siyaabhi441@gmail.com (or any other email where you want to receive notifications)

## Setting Up MongoDB Atlas

1. **Create a MongoDB Atlas Account**:
   - Sign up at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
   - Create a new project

2. **Create a Cluster**:
   - Click "Build a Database"
   - Choose the free tier option
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Set Up Database Access**:
   - In the Security tab, click "Database Access"
   - Add a new database user with a username and password
   - Give this user "Read and Write to Any Database" permissions

4. **Set Up Network Access**:
   - In the Security tab, click "Network Access"
   - Click "Add IP Address"
   - For development, you can select "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add your server's specific IP address

5. **Get Your Connection String**:
   - Once your cluster is created, click "Connect"
   - Select "Connect your application"
   - Choose Node.js as the driver
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Replace `<dbname>` with "suviksan"

6. **Update Your .env File**:
   - Set `MONGODB_URI` to your connection string

## Testing Your Setup

1. Start the server with `npm run dev`
2. Open your frontend application
3. Submit a test message through the contact form
4. You should:
   - See a success message in the UI
   - Receive an email notification at siyaabhi441@gmail.com
   - Find the message stored in your MongoDB Atlas database

If you encounter any issues, check the server console for error messages.

## Troubleshooting

- **MongoDB Connection Issues**: Make sure your IP is whitelisted in MongoDB Atlas Network Access
- **SendGrid Errors**: Verify your API key and sender authentication
- **CORS Errors**: The server is configured to accept requests from common development ports, but you may need to adjust the CORS settings in `server/index.js` if using a different port

For any other issues, please refer to the error messages in the server console or contact the developer. 