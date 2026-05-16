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

export const readAuthorById = async(data) => {
    const {id} = data;

    const author = await prisma.autores.findUnique({
        where: {
            id: id
        }
    })

    return author
}

export const readAuthor = async(data) => {
    const {nombre} = data;

    if (!nombre) {
        throw new AppError("Debe proveer nombre para buscar autor", 400);
    }

    const author = await prisma.autores.findMany({
        where: {
            nombre: {
                contains: nombre,
                mode: 'insensitive'
            }
        }
    })

    return author
}
