import jwt from "jsonwebtoken";
import "dotenv/config";
const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export default generateToken;
