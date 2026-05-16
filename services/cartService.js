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

export const deleteProductFromCart = async (idCliente, idProducto) => {
    if (!idCliente || !idProducto) {
        throw new AppError('El id del cliente y el id del producto son obligatorios', 400);
    }

    const productoEnCarrito = await prisma.carritos.findUnique({
        where: {
            id_cliente_id_producto: {
                id_cliente: idCliente,
                id_producto: idProducto
            }
        },
        include: {
            producto: true
        }
    });

    if (!productoEnCarrito) {
        throw new AppError('El producto no se encuentra en el carrito', 404);
    }

    const productoEliminado = await prisma.carritos.delete({
        where: {
            id_cliente_id_producto: {
                id_cliente: idCliente,
                id_producto: idProducto
            }
        },
        include: {
            producto: true
        }
    });

    return {
        mensaje: 'Producto eliminado del carrito exitosamente',
        data: productoEliminado
    };
};
