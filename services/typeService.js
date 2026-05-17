import { prisma } from '../prisma.js';
import { AppError }from '../errors/appError.js';
import normalize from './normalizeText.js';

export const createType = async (data) => {
    let {nombre} = data;

    if (!nombre) {
        throw new AppError('El nombre es obligatorio', 400);
    }

    nombre = normalize(nombre);

    const type = await prisma.tipos.create({
        data: {
            nombre
        }
    });

    return type;
};