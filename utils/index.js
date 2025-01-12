import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development", // Set to true for production
    sameSite: "Strict", // Allow the cookie to be sent cross-domain
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
};
