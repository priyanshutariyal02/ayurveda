const generateOTP = (): string => {
    // Generate 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  export { generateOTP };
  