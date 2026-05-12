import * as productsService from '../services/productsService.js';

export const createProduct = async (req, res, next) => {
    try {
        const product = await productsService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

export const readProduct = async (req, res, next) => {
    try {
        const { nombre, autor, editorial, tipo, categoria } = req.query;
        const products = await productsService.readProduct({ nombre, autor, editorial, tipo, categoria });
        res.status(200).json({ data: products });
    } catch (error) {
        next(error);
    }
}
