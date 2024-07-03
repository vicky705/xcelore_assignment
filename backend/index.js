import express from "express";
import dotenv from "dotenv";
import dbConnect from "./conn/conn.js";
import cors from "cors";
import userRouter from "./route/userRoute.js";
import { verifyToken } from "./middleware/verityToken.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/v1/users', userRouter)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.message || "something went wrong";
  return res.status(status).json({ success: false, msg });
});

app.listen(process.env.PORT, () => {
  dbConnect();
  console.log(`server is running at`, process.env.PORT);
});