import { prisma } from '../prisma.js';
import { AppError }from '../errors/appError.js';
import normalize from './normalizeText.js';

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

export const readCategoryById = async (data) => {
    const id = data;

    const category = await prisma.categorias.findUnique({
        where: {
            id: id
        }
    })

    return category
}

export const readCategory = async (data) => {
    let { nombre } = data;

    nombre = normalize(nombre);

    if (!nombre) {
        throw new AppError("Debe proveer nombre para buscar categoria", 400);
    }

    const category = await prisma.categorias.findMany({
        where: {
            nombre: {
                contains: nombre,
                mode: 'insensitive'
            }
        }
    })

    return category;
}
