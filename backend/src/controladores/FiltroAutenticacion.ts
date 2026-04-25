import { Request, Response, NextFunction } from 'express';
import { ServicioSesionUsuario } from '../servicios/apoyo/ServicioSesionUsuario';

const servicioSesion = new ServicioSesionUsuario();

export const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ mensaje: 'Token no proporcionado' });
    return;
  }

  const decoded = servicioSesion.validarFirmaToken(token);

  if (!decoded) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
    return;
  }

  (req as any).usuario = decoded;
  next();
};

export const verificarRol = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const usuario = (req as any).usuario;

    if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
      res.status(403).json({ mensaje: 'No tiene permisos para realizar esta acción' });
      return;
    }

    next();
  };
};