"use strict";

const nodemailer = require("nodemailer");

/**
 * Function to generate a random 6-digit OTP.
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Function to generate the HTML email template with the OTP.
 */
const generateEmailTemplate = (OTP) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background-color: #cbfb45;
          color: #0000;
          text-align: center;
          padding: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
          color: #333333;
          line-height: 1.6;
        }
        .otp {
          display: inline-block;
          margin: 20px 0;
          padding: 10px 20px;
          background-color: #3c3c3c;
          color: #cbfb45;
          font-size: 20px;
          font-weight: bold;
           border:5px solid #cbfb45;
          border-radius: 10px;
         
        }
        .footer {
          background-color: #f4f4f4;
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #666666;
        }
        .footer a {
          color: #cbfb45;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>TechChaze</h1>
        </div>
        <div class="content">
          <p>Hi,</p>
          <p>Thank you for signing up at <strong>TechChaze</strong>! To verify your email address, please use the OTP below:</p>
          <div class="otp">${OTP}</div>
          <p>If you did not request this email, please ignore it. This OTP will expire in 10 minutes.</p>
          <p>Best regards,<br>Team TechChaze</p>
        </div>
        <div class="footer">
          <p>&copy; 2025 TechChaze. All rights reserved.</p>
          <p><a href="https://techchaze.com">Visit our website</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Function to send OTP email.
 */
module.exports.sendOTP = async (email) => {
  const OTP = generateOTP();
  console.log("Generated OTP:", OTP);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "uq0803@gmail.com", // Replace with your email
      pass: "gsfp ifld qnmc wwqd", // Replace with your app-specific password
    },
  });

  const mailOptions = {
    from: '"TechChaze" <uq0803@gmail.com>', // Replace with your sender email
    to: email,
    subject: "Your OTP for Your Email Verification at Ecommerce TechChaze",
    text: `Your OTP is ${OTP}`,
    html: generateEmailTemplate(OTP), // Use the professional template
  };

  try {
    await transporter.sendMail(mailOptions);
    return OTP; // Return OTP for storage
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP");
  }
};
