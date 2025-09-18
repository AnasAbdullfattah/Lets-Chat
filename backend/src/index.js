import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import {connectDB} from "./lib/db.js"
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoute);
app.listen(port, () => {
  console.log("Ayoooooooooo Let's Chat");
  connectDB();
});
