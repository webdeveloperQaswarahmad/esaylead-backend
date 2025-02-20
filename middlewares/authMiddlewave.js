import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    console.log("Token from cookies:", token); // Debugging log
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized." });
    }
    JWT_SECRET="3ebd6f37abfbaf69e1eeece3e78046f21aed88afb8028d99f2057b2137a0d33a";
    
    if (token) {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      console.log("Decoded Token:", decodedToken); // Debugging log

      const resp = await User.findById(decodedToken.userId).select(
        "isAdmin email"
      );

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken.userId,
      };

      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

export { isAdminRoute, protectRoute };
