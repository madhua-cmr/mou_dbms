import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import "dotenv/config";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log(req.cookies);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Access Denied,No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const existUser = await User.findById(decoded.userId).select("-password");
   
    console.log(existUser);
    if (!existUser) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = existUser;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ success: false, error: "Invalid or Expired Token" });
  }
};
