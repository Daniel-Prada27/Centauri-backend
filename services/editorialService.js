import { prisma } from '../prisma.js';
import { AppError }from '../errors/appError.js';
import normalize from './normalizeText.js';

export const createEditorial = async (data) => {
    let {nombre} = data;

    if (!nombre) {
        throw new AppError('El nombre es obligatorio', 400);
    }

    nombre = normalize(nombre);

    const editorial = await prisma.editoriales.create({
        data: {
            nombre
        }
    });

    return editorial;
};
