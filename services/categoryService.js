import { prisma } from '../prisma.js';
import { AppError }from '../errors/appError.js';

export const createCategory = async (data) => {
    const {nombre} = data;

    if (!nombre) {
        throw new AppError('El nombre es obligatorio', 400);
    }

    const category = await prisma.categorias.create({
        data: {
            nombre
        }
    });

    return category;
};
