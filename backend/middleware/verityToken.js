import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {createError} from "../error.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(createError(401, "Unauthorized: Missing or invalid token"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SEC_KEY);
    req.user = decoded;

    if (req.user.isAdmin !== true) {
      return next(createError(403, "Forbidden: Admin access required"));
    }

    next();
  } catch (err) {
    next(createError(403, "Forbidden: Invalid token"));
  }
};

export default { verifyToken };
