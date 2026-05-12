import { Router } from "express";
import { body } from 'express-validator';
import { createAuthor } from '../controllers/autorsController.js';
import { requireLogin } from '../middleware/validateSession.js';

const authorsRoutes = Router();

authorsRoutes.use(requireLogin);

authorsRoutes.post('', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
], createAuthor);

export default authorsRoutes;
