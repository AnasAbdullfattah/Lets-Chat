import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import {connectDB} from "./lib/db.js"
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);
app.listen(port, () => {
  console.log("Ayoooooooooo Let's Chat");
  connectDB();
});
