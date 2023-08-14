import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const validateUser = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.EXCESS_TOKEN, (err, decoded) => {
        if (err) {
          throw Error("Tokken is expired !!");
        }
        req.user = decoded.id;
        next();
      });
    }
    if (!token) {
      throw Error("Token Missing !!");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
