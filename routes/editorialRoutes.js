import { Router } from "express";
import { body } from 'express-validator';
import { createEditorial, readEditorial, readEditorialById, updateEditorial } from '../controllers/editorialController.js';
import { requireLogin } from '../middleware/validateSession.js';
import { requireEmployee } from "../middleware/employeeValidation.js";

const editorialRoutes = Router();

editorialRoutes.use(requireLogin);

editorialRoutes.get('', readEditorial);
editorialRoutes.get('/:id', readEditorialById);

editorialRoutes.post('', requireEmployee, [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
], createEditorial);

editorialRoutes.put('/:id', requireEmployee, updateEditorial);

export default editorialRoutes;