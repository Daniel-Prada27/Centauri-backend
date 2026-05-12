import * as autorsService from '../services/authorsService.js';

export const createAuthor = async (req, res, next) => {
    try {
        const author = await autorsService.createAuthor(req.body);
        res.status(201).json(author);
    } catch (error) {
        next(error);
    }
};
