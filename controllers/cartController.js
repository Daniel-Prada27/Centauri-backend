import * as cartService from "../services/cartService.js";
import { AppError } from "../errors/appError.js";

export const getCartByClientId = async (req, res, next) => {
    try {
        const { idCliente } = req.params;
        if (req.session.user.id_cliente !== idCliente) {
            throw new AppError('No tienes permiso para consultar este carrito', 403);
        }

        const cart = await cartService.getCartByClientId(idCliente);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};
