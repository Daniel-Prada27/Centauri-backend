import { Router } from "express";
import { body } from 'express-validator';
import { createEditorial } from '../controllers/editorialController.js';

const editorialRoutes = Router();

editorialRoutes.post('/createEditorial', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio')
], createEditorial);

export default editorialRoutes;