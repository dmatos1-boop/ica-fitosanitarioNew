import { Request, Response } from 'express';
import { ServicioUsuarioImpl } from '../servicios/implementaciones/ServicioUsuarioImpl';

const servicioUsuario = new ServicioUsuarioImpl();

export const crearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await servicioUsuario.crearNuevoUsuario(req.body);
    res.status(201).json({ mensaje: 'Usuario creado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario', error });
  }
};

export const obtenerUsuario = async (req: Request<{identificacion: string}>, res: Response): Promise<void> => {
  try {
    const usuario = await servicioUsuario.consultarUsuario(req.params.identificacion);
    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    } else {
      res.status(200).json(usuario);
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar usuario', error });
  }
};

export const listarUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await servicioUsuario.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar usuarios', error });
  }
};

export const actualizarUsuario = async (req: Request<{identificacion: string}>, res: Response): Promise<void> => {
  try {
    const resultado = await servicioUsuario.actualizarDatosUsuario(req.params.identificacion, req.body);
    res.status(200).json({ mensaje: 'Usuario actualizado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
};

export const desactivarUsuario = async (req: Request<{identificacion: string}>, res: Response): Promise<void> => {
  try {
    await servicioUsuario.desactivarCuentaUsuario(req.params.identificacion);
    res.status(200).json({ mensaje: 'Usuario desactivado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al desactivar usuario', error });
  }
};

export const cambiarEstadoUsuario = async (req: Request<{identificacion: string}>, res: Response): Promise<void> => {
  try {
    const { estado } = req.body;
    if (estado === 'ACTIVO') {
      await servicioUsuario.activarCuentaUsuario(req.params.identificacion);
      res.status(200).json({ mensaje: 'Usuario activado exitosamente' });
    } else if (estado === 'INACTIVO') {
      await servicioUsuario.desactivarCuentaUsuario(req.params.identificacion);
      res.status(200).json({ mensaje: 'Usuario desactivado exitosamente' });
    } else {
      res.status(400).json({ mensaje: 'Estado inválido' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar estado', error });
  }
};