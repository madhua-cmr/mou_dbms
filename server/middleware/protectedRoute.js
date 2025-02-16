import jwt from "jsonwebtoken";
import "dotenv/config";
export const protectRoute = async (req, res, next) => {

  try {
    const token = req.cookies?.token;
    console.log(req.cookies)
    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Access Denied,No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, error: "Invalid or Expired Token" });
  }
};
