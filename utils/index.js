import mongoose from "mongoose";
import jwt from "jsonwebtoken";


export const dbConnection = async () => {
  try {
    const uri = process.env.MONGODB_URI; // Your MongoDB connection string

    if (!uri) {
      throw new Error("MongoDB URI is not defined!");
    }

    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds if no server is found
      socketTimeoutMS: 45000, // Timeout for socket operations
    });

    console.log("DB connection established with MongoDB!");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};

export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensures cookies are secure in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // SameSite set to "None" in production
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
};
