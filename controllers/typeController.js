import * as typeService from '../services/typeService.js'

export const createType = async (req, res, next) => {
    try{
        const type = await typeService.createType(req.body);
        res.status(201).json(type);
    } catch (error) {
        next(error);
    }
}