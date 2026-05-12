import { Router } from "express";
import { body } from 'express-validator';
import { createAuthor } from '../controllers/autorsController.js';

const authorsRoutes = Router();

authorsRoutes.post('/createAuthor', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
], createAuthor);

export default authorsRoutes;
