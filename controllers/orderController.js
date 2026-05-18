import { AppError } from "../errors/appError.js";

export const createOrder = async (req, res, next) => {
    try {
        throw new AppError('Endpoint de pedidos no implementado', 501);
    } catch (error) {
        next(error);
    }
};
