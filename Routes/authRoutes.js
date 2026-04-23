import { Router } from "express";
import { login, registro } from "../Controllers/authController.js";


const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/registro', registro);

export default authRoutes;