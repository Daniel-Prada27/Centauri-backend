import { prisma } from '../prisma.js';
import { AppError }from '../errors/appError.js';

export const createEditorial = async (data) => {
    const {nombre} = data;

    if (!nombre) {
        throw new AppError('El nombre es obligatorio', 400);
    }

    const editorial = await prisma.editoriales.create({
        data: {
            nombre
        }
    });

    return editorial;
};
