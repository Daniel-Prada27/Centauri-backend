import { Router } from "express";
import { getCartByClientId } from "../controllers/cartController.js";
import { requireLogin } from "../middleware/validateSession.js";


const cartRoutes = Router();

cartRoutes.use(requireLogin);

cartRoutes.get('/:idCliente', getCartByClientId);

export default cartRoutes;
