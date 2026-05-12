import { prisma } from '../prisma.js';
import { AppError }from '../errors/appError.js';

export const createAuthor = async (data) => {
    const {nombre} = data;

    if (!nombre) {
        throw new AppError('El nombre es obligatorio', 400);
    }

    const author = await prisma.autores.create({
        data: {
            nombre
        }
    });

    return author;
};
