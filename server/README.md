# Suviksan Backend Server

This is the backend server for the Suviksan website, handling contact form submissions and storing them in MongoDB Atlas. It also sends email notifications when new contact forms are submitted using SendGrid.

## Quick Setup

Run the setup script to quickly set up the backend:

```bash
node setup.js
```

This will create the `.env` file and install all dependencies.

## Manual Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following environment variables:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/suviksan
     NODE_ENV=development
     
     # Email Configuration (SendGrid)
     SENDGRID_API_KEY=your_sendgrid_api_key
     FROM_EMAIL=contact@yourdomain.com
     CONTACT_EMAIL=siyaabhi441@gmail.com
     ```
   - Replace values with your actual credentials

3. Start the server:
   - Development mode: `npm run dev`
   - Production mode: `npm start`

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient for development)
3. In the "Security" tab, create a new database user with password authentication
4. In the "Network Access" tab, add your IP address or allow access from anywhere (for development only)
5. In the "Databases" tab, click "Connect" on your cluster, then "Connect your application"
6. Copy the connection string and replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials
7. Update the `MONGODB_URI` in your `.env` file with this connection string

## SendGrid Email Setup

The server uses SendGrid to send email notifications when a new contact form is submitted. To configure email notifications:

1. Create a free SendGrid account at [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
2. In your SendGrid dashboard, navigate to Settings > API Keys and create a new API key
3. Copy the API key and add it to your `.env` file as `SENDGRID_API_KEY`
4. Set up Sender Authentication:
   - Go to Settings > Sender Authentication
   - Verify a Single Sender or set up Domain Authentication
   - Use the verified email address as your `FROM_EMAIL` in the `.env` file
5. The `CONTACT_EMAIL` setting determines where the form submissions are sent (default is siyaabhi441@gmail.com)

## API Endpoints

### Contact Form

- **POST /api/contact** - Submit a new contact form
  - Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "company": "Example Inc",
      "message": "Hello, I'd like to learn more about your services."
    }
    ```
  - Response:
    ```json
    {
      "success": true,
      "data": {
        "_id": "60f7b0b3e6e7f32b8c9b0f5c",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "company": "Example Inc",
        "message": "Hello, I'd like to learn more about your services.",
        "createdAt": "2023-07-21T10:30:43.000Z"
      },
      "emailSent": true
    }
    ```

- **GET /api/contact** - Get all contact submissions (protected, admin only)
  - Response:
    ```json
    {
      "success": true,
      "count": 1,
      "data": [
        {
          "_id": "60f7b0b3e6e7f32b8c9b0f5c",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "1234567890",
          "company": "Example Inc",
          "message": "Hello, I'd like to learn more about your services.",
          "createdAt": "2023-07-21T10:30:43.000Z"
        }
      ]
    }
    ```

## Frontend Integration

To integrate this backend with the frontend:

1. Create a `.env` file in the frontend root directory with:
   ```
   VITE_API_URL=http://localhost:5000
   ```

2. In your ContactSection.tsx component, the API URL is already configured to use this environment variable:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

3. The form submission is handled by the `handleSubmit` function, which sends data to the `/api/contact` endpoint.

4. Success and error messages are displayed in the UI after form submission. 