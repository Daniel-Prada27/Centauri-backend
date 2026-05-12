import * as editorialService from '../services/editorialService.js';

export const createEditorial = async (req, res, next) => {
    try{
        const editorial = await editorialService.createEditorial(req.body);
        res.status(201).json(editorial);
    } catch (error) {
        next(error);
    }
}