module.exports = {
  routes: [
    {
      method: "POST",
      path: "/send-otp",
      handler: "otp.sendOtp",
      config: {
        policies: [],
        description: "Send OTP to the user's email.",
      },
    },
    {
      method: "POST",
      path: "/verify-otp",
      handler: "otp.verifyOtp",
      config: {
        policies: [],
        description: "Verify the OTP sent to the user.",
      },
    },
  ],
};
