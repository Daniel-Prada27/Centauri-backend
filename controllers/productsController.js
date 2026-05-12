import * as productsService from '../services/productsService.js';

export const createProduct = async (req, res, next) => {
    try {
        const product = await productsService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}
