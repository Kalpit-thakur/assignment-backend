'use strict';

const { sendOTP } = require('../services/otp');

let otpStorage = {}; // Temporary in-memory storage for OTPs

module.exports = {

  async sendOtp(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('Email is required.');
    }

    try {
      const OTP = await sendOTP(email); // Generate and send OTP
      otpStorage[email] = OTP; // Store OTP for verification
      return ctx.send({ message: 'OTP sent successfully.' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      return ctx.internalServerError('Failed to send OTP.');
    }
  },

  /**
   * Verify the OTP provided by the user.
   */
  async verifyOtp(ctx) {
    const { email, otp } = ctx.request.body;

    if (!email || !otp) {
      return ctx.badRequest('Email and OTP are required.');
    }

    if (otpStorage[email] && otpStorage[email] === otp) {
      delete otpStorage[email]; // Remove OTP after verification
      return ctx.send({ message: 'OTP verified successfully.' });
    } else {
      return ctx.badRequest('Invalid OTP.');
    }
  },
};


