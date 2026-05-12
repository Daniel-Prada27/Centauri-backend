import {Router} from 'express';
import {body} from 'express-validator';
import { createProduct, readProduct } from '../controllers/productsController.js';
import { requireLogin } from '../middleware/validateSession.js';

const productsRoutes = Router();

productsRoutes.use(requireLogin);

productsRoutes.post('', [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('existencias').isInt({ min: 0 }).withMessage('Las existencias deben ser un número entero mayor o igual a 0'),
    body('fecha_publicacion').isDate().withMessage('La fecha de publicación no es válida'),
    body('id_tipo').notEmpty().withMessage('El tipo es obligatorio'),
    body('id_autor').notEmpty().withMessage('El autor es obligatorio'),
    body('id_editorial').notEmpty().withMessage('La editorial es obligatoria'),
    body('id_categoria').notEmpty().withMessage('La categoría es obligatoria')
], createProduct)

productsRoutes.get('', readProduct);

export default productsRoutes;
