const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Mywebsite.html'));
});

// Route to submit-form.html
app.get('/submit-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'submit-form.html'));
});

// Middleware to parse JSON data
app.use(express.json());

// Handle POST request to /submit-form
app.post('/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Form data received:', formData);

  // Here you can process the form data as needed
  // For example, you can save it to a database, send it via email, etc.

  // Send back the form data as a response
  sendEmail(formData)
    .then(() => {
      console.log('Email sent successfully');
      res.redirect(`/submit-form?name=${formData.name}&email=${formData.email}&message=${formData.message}`);
    })
    .catch(error => {
      console.error('Failed to send email:', error);
      res.sendStatus(500);
    });
});

// Function to send email using Nodemailer
async function sendEmail(formData) {
  // Configure Nodemailer with your email service provider details
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'Gmail', 'Outlook'
    auth: {
      user: 'patricklmm7@gmail.com',
      pass: 'mvmocshgojkaxszg'
    }
  });

  // Compose the email message
  const mailOptions = {
    from: 'sender_email_address',
    to: 'patricklmm7@gmail.com',
    subject: 'Form Submission',
    text: `
      Form Data:
      Name: ${formData.name}
      Email: ${formData.email}
      Message: ${formData.message}
    `
  };

  // Send the email
  return transporter.sendMail(mailOptions);
}


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
