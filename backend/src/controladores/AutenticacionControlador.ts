import { Request, Response } from 'express';
import { ServicioAutenticacionImpl } from '../servicios/implementaciones/ServicioAutenticacionImpl';

const servicioAutenticacion = new ServicioAutenticacionImpl();

export const iniciarSesion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, clave } = req.body;
    const resultado = await servicioAutenticacion.autenticarUsuario(email, clave);
    res.status(200).json({ mensaje: 'Sesión iniciada exitosamente', datos: resultado });
  } catch (error: any) {
    res.status(401).json({ mensaje: error.message });
  }
};

export const cerrarSesion = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    await servicioAutenticacion.cerrarSesionUsuario(token);
    res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cerrar sesión', error });
  }
};