import { Router } from "express";
import { body } from 'express-validator';
import { createCategory } from '../controllers/categoryController.js';
import { requireLogin } from '../middleware/validateSession.js';

const categoryRoutes = Router();

categoryRoutes.use(requireLogin);

categoryRoutes.post('/createCategory', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
], createCategory);

export default categoryRoutes;