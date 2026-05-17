import { Router } from "express";
import { body } from 'express-validator';
import { requireLogin } from '../middleware/validateSession.js';
import { requireEmployee } from "../middleware/employeeValidation.js";
import { createType, readType, readTypeById } from "../controllers/typeController.js";

const typeRoutes = Router();

typeRoutes.use(requireLogin);

typeRoutes.get('', readType);
typeRoutes.get('/:id', readTypeById);

typeRoutes.post('', requireEmployee, [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
], createType);

export default typeRoutes;