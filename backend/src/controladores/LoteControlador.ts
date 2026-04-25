import { Request, Response } from 'express';
import { ServicioLoteImpl } from '../servicios/implementaciones/ServicioLoteImpl';

const servicioLote = new ServicioLoteImpl();

export const registrarLote = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await servicioLote.registrarLote(req.body);
    res.status(201).json({ mensaje: 'Lote registrado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar lote', error });
  }
};

export const obtenerLote = async (req: Request<{idLote: string}>, res: Response): Promise<void> => {
  try {
    const lote = await servicioLote.consultarLote(Number(req.params.idLote));
    if (!lote) {
      res.status(404).json({ mensaje: 'Lote no encontrado' });
    } else {
      res.status(200).json(lote);
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar lote', error });
  }
};

export const listarLotesPorLugar = async (req: Request<{nroRegICAlugar: string}>, res: Response): Promise<void> => {
  try {
    const lotes = await servicioLote.listarLotesPorLugar(req.params.nroRegICAlugar);
    res.status(200).json(lotes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar lotes', error });
  }
};

export const actualizarLote = async (req: Request<{idLote: string}>, res: Response): Promise<void> => {
  try {
    const resultado = await servicioLote.actualizarDatosLote(Number(req.params.idLote), req.body);
    res.status(200).json({ mensaje: 'Lote actualizado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar lote', error });
  }
};

export const listarTodosLotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const lotes = await servicioLote.listarTodosLotes();
    res.status(200).json(lotes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar lotes', error });
  }
};

export const cambiarEstadoLote = async (req: Request<{idLote: string}>, res: Response): Promise<void> => {
  try {
    await servicioLote.cambiarEstadoLote(Number(req.params.idLote), req.body.estado);
    res.status(200).json({ mensaje: 'Estado del lote actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar estado del lote', error });
  }
};