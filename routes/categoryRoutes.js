import { Router } from "express";
import { body } from 'express-validator';
import { createCategory } from '../controllers/categoryController.js';

const categoryRoutes = Router();

categoryRoutes.post('/createCategory', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
], createCategory);

export default categoryRoutes;