import { Request, Response } from 'express';
import { ServicioCultivoImpl } from '../servicios/implementaciones/ServicioCultivoImpl';

const servicioCultivo = new ServicioCultivoImpl();

export const crearCultivo = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await servicioCultivo.crearCultivo(req.body);
    res.status(201).json({ mensaje: 'Cultivo creado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear cultivo', error });
  }
};

export const obtenerCultivo = async (req: Request<{idCultivo: string}>, res: Response): Promise<void> => {
  try {
    const cultivo = await servicioCultivo.consultarCultivo(Number(req.params.idCultivo));
    if (!cultivo) {
      res.status(404).json({ mensaje: 'Cultivo no encontrado' });
    } else {
      res.status(200).json(cultivo);
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar cultivo', error });
  }
};

export const listarCultivos = async (req: Request, res: Response): Promise<void> => {
  try {
    const cultivos = await servicioCultivo.listarCultivos();
    res.status(200).json(cultivos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar cultivos', error });
  }
};

export const actualizarCultivo = async (req: Request<{idCultivo: string}>, res: Response): Promise<void> => {
  try {
    const resultado = await servicioCultivo.actualizarCultivo(Number(req.params.idCultivo), req.body);
    res.status(200).json({ mensaje: 'Cultivo actualizado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar cultivo', error });
  }
};

export const cambiarEstadoCultivo = async (req: Request<{idCultivo: string}>, res: Response): Promise<void> => {
  try {
    await servicioCultivo.cambiarEstadoCultivo(Number(req.params.idCultivo), req.body.estado);
    res.status(200).json({ mensaje: 'Estado del cultivo actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar estado del cultivo', error });
  }
};