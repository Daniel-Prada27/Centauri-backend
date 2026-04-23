import bcrypt from 'bcrypt';
import { prisma } from '../prisma.js';

export const login = async (req, res) => {
  const { correo, clave } = req.body;

  if (!correo || !clave) {
    return res.status(400).json({ mensaje: 'Correo y clave son obligatorios' });
  }

  try {
    // Buscar usuario únicamente por correo
    const usuarioEncontrado = await prisma.usuarios.findFirst({
      where: { correo: correo }
    });

    if (!usuarioEncontrado) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar clave
    const claveValida = await bcrypt.compare(clave, usuarioEncontrado.clave);

    if (!claveValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Guardar en sesión
    req.session.usuario = {
      id: usuarioEncontrado.id,
      usuario: usuarioEncontrado.usuario,
      correo: usuarioEncontrado.correo
    };

    return res.status(200).json({ mensaje: 'Login exitoso' });

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error del servidor', error });
  }
};


export const registro = async (req, res) => {
  const { usuario, clave, correo, cedula, nombre, direccion } = req.body;

  try {
    // Verificar si el usuario ya existe
    const usuarioExiste = await prisma.usuarios.findFirst({
      where: {correo: correo }
    });

    if (usuarioExiste) {
      return res.status(400).json({ mensaje: 'El correo ya existe' });
    }

    // Encriptar clave
    const claveEncriptada = await bcrypt.hash(clave, 10);

    // Crear usuario y cliente en una transacción
    const resultado = await prisma.$transaction(async (tx) => {
      const nuevoUsuario = await tx.usuarios.create({
        data: {
          id: crypto.randomUUID(),
          usuario,
          clave: claveEncriptada,
          correo
        }
      });

      const nuevoCliente = await tx.clientes.create({
        data: {
          id: crypto.randomUUID(),
          id_usuario: nuevoUsuario.id,
          cedula,
          nombre,
          direccion,
          activo: true
        }
      });

      return { nuevoUsuario, nuevoCliente };
    });

    return res.status(201).json({ mensaje: 'Usuario registrado exitosamente', data: resultado });

  } catch (error) {
    return res.status(500).json({ mensaje: 'Error del servidor', error });
  }
};