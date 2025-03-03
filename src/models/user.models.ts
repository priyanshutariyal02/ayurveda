import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    resetPasswordOTP: {
        type: String,
        default: null
    },
    resetPasswordOTPExpiry: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);