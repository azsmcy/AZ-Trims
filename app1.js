// Smooth scroll when clicking links in navbar
document.querySelectorAll('.navbar a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Form submission (you can customize with AJAX if necessary)
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  
  alert(`Thanks for contacting us, ${name}! We will get back to you soon at ${email}.`);
  
  // Reset form after submission
  document.getElementById('contact-form').reset();
});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Set up a POST route to handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email } = req.body;
  
  // Set up email transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
      user: 'your_email@gmail.com', // Replace with your email
      pass: 'your_email_password' // Replace with your email password
    }
  });

  // Email options
  const mailOptions = {
    from: email, // The email entered in the form
    to: 'your_email@gmail.com', // Your email where form submissions will go
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.send('Error in sending email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Message sent successfully!');
    }
  });
});

// Serve the HTML file
app.use(express.static('public')); // Assuming HTML and CSS are in the 'public' folder

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
