import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const dbConnection = async () => {
  try {
    const uri =
      "mongodb+srv://qaswarahmad:ahmad123@task-manager-cluster.pdlkc.mongodb.net/?retryWrites=true&w=majority&appName=task-manager-cluster";

    if (!uri) {
      throw new Error("MongoDB URI is not defined!");
    }

    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds if no server is found
      socketTimeoutMS: 45000, // Timeout for socket operations
    });

    console.log("DB connection established with MongoDB!");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};
var JWT_SECRET="3ebd6f37abfbaf69e1eeece3e78046f21aed88afb8028d99f2057b2137a0d33a";
export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensures cookies are secure in production
    sameSite: "None",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
};
