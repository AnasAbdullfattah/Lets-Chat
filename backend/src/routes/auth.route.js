import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/logout", logout);

export default route;
