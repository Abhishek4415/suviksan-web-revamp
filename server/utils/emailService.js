import nodemailer from 'nodemailer';

/**
 * Formats contact form data into an HTML email template
 * @param {Object} formData - Contact form data including name, email, phone, company, message
 * @returns {String} HTML email content
 */
const formatEmailHtml = (formData) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #2563eb; margin-bottom: 20px;">New Contact Form Submission</h2>
      
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${formData.company || 'Not provided'}</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #4b5563;">Message:</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
      </div>
      
      <div style="font-size: 12px; color: #6b7280; margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee;">
        <p>This message was sent from the Suviksan website contact form at ${new Date().toLocaleString()}.</p>
      </div>
    </div>
  `;
};

/**
 * Sends a notification email with the contact form submission using Nodemailer
 * @param {Object} formData - Contact form data
 * @returns {Promise} - Resolves when email is sent or rejects with error
 */
export const sendContactEmail = async (formData) => {
  try {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true' || false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // Email options
    const mailOptions = {
      from: `${formData.email}` || 'contact@suviksan.com',
      to: process.env.CONTACT_EMAIL || 'siyaabhi441@gmail.com',
      subject: `New Contact Form Submission from ${formData.name}`,
      html: formatEmailHtml(formData),
      replyTo: formData.email
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully with Nodemailer:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email with Nodemailer:', error);
    throw error;
  }
};

export default { sendContactEmail }; 