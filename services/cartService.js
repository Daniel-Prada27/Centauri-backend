import { prisma } from '../prisma.js';
import { AppError } from '../errors/appError.js';

export const getCartByClientId = async (idCliente) => {
    if (!idCliente) {
        throw new AppError('El id del cliente es obligatorio', 400);
    }

    const cliente = await prisma.clientes.findUnique({
        where: {
            id: idCliente
        }
    });

    if (!cliente) {
        throw new AppError('El cliente indicado no existe', 404);
    }

    const carrito = await prisma.carritos.findMany({
        where: {
            id_cliente: idCliente
        },
        include: {
            producto: true
        }
    });

    if (carrito.length === 0) {
        return {
            mensaje: 'El carrito esta vacio',
            data: []
        };
    }

    return {
        mensaje: 'Carrito obtenido exitosamente',
        data: carrito
    };
};
