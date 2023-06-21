const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const NewsLetterSubs = require('../models/NewsLetterSubs');

const router = express.Router();

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

// Function to send a subscription confirmation email
async function sendConfirmationEmail(email) {
  try {
    // Send the email
    await transporter.sendMail({
      from: 'Kareemmoataz13@gmail.com', // Replace with your email address
      to: email,
      subject: 'Subscription Confirmation',
      text: 'Thank you for subscribing to our newsletter!',
      html: `
        <html>
          <head>
            <style>
              h1 {
                color: #337ab7;
              }
              p {
                color: #555;
                font-size: 16px;
                line-height: 1.5;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <h1>Welcome to Our Company!</h1>
              <p>Thank you for subscribing to our newsletter. We are thrilled to have you on board!</p>
              <p>Stay tuned for exciting updates, news, and exclusive offers.</p>
              <p>Best regards,</p>
              <p>Your Company Team</p>
            </div>
          </body>
        </html>
      `
    });

    console.log('Confirmation email sent successfully.');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }

}
router.post('/subscribe', async (req, res) => {
    const email = req.body.email;
  
    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }
  
    try {
      const existingSubscription = await NewsLetterSubs.findOne({ email });
  
      if (existingSubscription) {
        return res.status(200).json({ message: 'Email already exists' });
      }
  
      const newSubscription = new NewsLetterSubs({ email }); 
      await newSubscription.save();
  
      // Send confirmation email
      sendConfirmationEmail(email);
  
      // Return a success response to the client
      res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(500).json({ message: 'Error subscribing to newsletter' });
    }
  });
  
  

module.exports = router;
