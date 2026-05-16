import { Router } from "express";
import { body } from 'express-validator';
import { createAuthor, readAuthor, readAuthorById } from '../controllers/autorsController.js';
import { requireLogin } from '../middleware/validateSession.js';
import { requireEmployee } from "../middleware/employeeValidation.js";

const authorsRoutes = Router();

authorsRoutes.use(requireLogin);

authorsRoutes.post('', requireEmployee, [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
], createAuthor);

authorsRoutes.get('', readAuthor);
authorsRoutes.get('/:id', readAuthorById);

export default authorsRoutes;
