import { Router } from "express";
import { body } from 'express-validator';
import { createCategory } from '../controllers/categoryController.js';
import { requireLogin } from '../middleware/validateSession.js';
import { requireEmployee } from "../middleware/employeeValidation.js";

const categoryRoutes = Router();

categoryRoutes.use(requireLogin);

categoryRoutes.post('', requireEmployee, [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
], createCategory);

export default categoryRoutes;