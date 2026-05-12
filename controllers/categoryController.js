import * as categoryService from '../services/categoryService.js';

export const createCategory = async (req, res, next) => {
    try{
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error) {
        next(error);
    }
}