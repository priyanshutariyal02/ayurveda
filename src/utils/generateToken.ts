import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generate a random secret key for JWT
const JWT_SECRET: string = crypto.randomBytes(32).toString("hex");

const generateToken = (userId: string): string => {
  return jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

export { generateToken, JWT_SECRET };
