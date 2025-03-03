import nodemailer from "nodemailer";

type SendEmailOptions = {
  email: string;
  subject: string;
  text: string;
};

const sendEmail = async ({ email, subject, text }: SendEmailOptions): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST as string,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER as string,
      to: email,
      subject,
      text,
    });

    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
};

export { sendEmail };
