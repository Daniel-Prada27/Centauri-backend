import { Router } from "express";
import { requireLogin } from "../middleware/validateSession.js";

const orderRoutes = Router();

orderRoutes.use(requireLogin);

orderRoutes.post('', );

export default orderRoutes;