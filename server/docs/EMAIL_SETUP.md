# Email Setup Guide with Nodemailer

This documentation explains how to configure Nodemailer for sending emails from the contact form in the Suviksan website.

## Environment Variables

Create a `.env` file in the server root directory with the following variables:

```
# Nodemailer Configuration
SMTP_HOST=smtp.gmail.com  # SMTP host (default: smtp.gmail.com)
SMTP_PORT=587  # SMTP port (default: 587)
SMTP_SECURE=false  # Use TLS (default: false)
SMTP_USER=your_email@gmail.com  # Your email address
SMTP_PASSWORD=your_app_password_here  # Your email password or app password

# Contact Email Settings
FROM_EMAIL=contact@suviksan.com  # Sender email address
CONTACT_EMAIL=your_email@example.com  # Recipient email address
```

## Gmail Setup Instructions

If you're using Gmail with Nodemailer, follow these steps:

1. Log in to your Gmail account
2. Go to your Google Account settings
3. Navigate to "Security" > "2-Step Verification" and turn it on
4. Go back to the Security page and click on "App passwords"
5. Select "Mail" as the app and "Other" as the device (name it "Suviksan Website")
6. Click "Generate" to get an app password
7. Copy this password and use it as your `SMTP_PASSWORD` in the `.env` file

## Testing the Email Service

You can test your email configuration by submitting the contact form on the website.

## Troubleshooting

### Common Issues with Gmail

- Make sure 2-Step Verification is enabled
- Use an App Password, not your regular Gmail password
- Some Gmail accounts may require "Less secure app access" to be enabled

### Checking Logs

If emails are not being sent, check the server logs for error messages. 