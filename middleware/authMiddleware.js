import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user in DB
    const user = await User.findById(decoded.id).select("username role userId");

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // attach user to request object
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
