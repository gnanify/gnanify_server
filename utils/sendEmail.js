const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Gnanify" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8'
    }
  });
};

module.exports = sendEmail;
