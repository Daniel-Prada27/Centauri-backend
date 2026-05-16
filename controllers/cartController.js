import * as cartService from "../services/cartService.js";
import { AppError } from "../errors/appError.js";

export const getCartByClientId = async (req, res, next) => {
    try {
        const idCliente = req.session.user.id_cliente;
        const cart = await cartService.getCartByClientId(idCliente);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

export const deleteProductFromCart = async (req, res, next) => {
    try {
        const {idProducto } = req.params;
        if (req.session.user.id_cliente !== idCliente) {
            throw new AppError('No tienes permiso para modificar este carrito', 403);
        }

        const cart = await cartService.deleteProductFromCart(idCliente, idProducto);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};
