import { Request, Response } from 'express';
import { ServicioLugarProduccionImpl } from '../servicios/implementaciones/ServicioLugarProduccionImpl';

const servicioLugar = new ServicioLugarProduccionImpl();

export const solicitarLugar = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await servicioLugar.solicitarRegistroLugar(req.body);
    res.status(201).json({ mensaje: 'Lugar de producción registrado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar lugar de producción', error });
  }
};

export const obtenerLugar = async (req: Request<{nroRegistroICA: string}>, res: Response): Promise<void> => {
  try {
    const lugar = await servicioLugar.consultarLugar(req.params.nroRegistroICA);
    if (!lugar) {
      res.status(404).json({ mensaje: 'Lugar de producción no encontrado' });
    } else {
      res.status(200).json(lugar);
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar lugar de producción', error });
  }
};

export const listarLugaresPorProductor = async (req: Request<{nroDocProductor: string}>, res: Response): Promise<void> => {
  try {
    const lugares = await servicioLugar.listarLugaresPorProductor(req.params.nroDocProductor);
    res.status(200).json(lugares);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar lugares de producción', error });
  }
};

export const listarTodosLugares = async (req: Request, res: Response): Promise<void> => {
  try {
    const lugares = await servicioLugar.listarTodosLugares();
    res.status(200).json(lugares);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar lugares', error });
  }
};

export const actualizarLugar = async (req: Request<{nroRegistroICA: string}>, res: Response): Promise<void> => {
  try {
    const resultado = await servicioLugar.actualizarDatosLugar(req.params.nroRegistroICA, req.body);
    res.status(200).json({ mensaje: 'Lugar de producción actualizado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar lugar de producción', error });
  }
};

export const gestionarEstadoLugar = async (req: Request<{nroRegistroICA: string}>, res: Response): Promise<void> => {
  try {
    await servicioLugar.gestionarEstadoLugar(req.params.nroRegistroICA, req.body.estado);
    res.status(200).json({ mensaje: 'Estado del lugar de producción actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al gestionar estado del lugar de producción', error });
  }
};