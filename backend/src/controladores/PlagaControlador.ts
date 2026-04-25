import { Request, Response } from 'express';
import { ServicioPlagaImpl } from '../servicios/implementaciones/ServicioPlagaImpl';

const servicioPlaga = new ServicioPlagaImpl();

export const crearPlaga = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await servicioPlaga.crearPlaga(req.body);
    res.status(201).json({ mensaje: 'Plaga creada exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear plaga', error });
  }
};

export const obtenerPlaga = async (req: Request<{idPlaga: string}>, res: Response): Promise<void> => {
  try {
    const plaga = await servicioPlaga.consultarPlaga(Number(req.params.idPlaga));
    if (!plaga) {
      res.status(404).json({ mensaje: 'Plaga no encontrada' });
    } else {
      res.status(200).json(plaga);
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar plaga', error });
  }
};

export const listarPlagas = async (req: Request, res: Response): Promise<void> => {
  try {
    const plagas = await servicioPlaga.listarPlagas();
    res.status(200).json(plagas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar plagas', error });
  }
};

export const listarPlagasPorCultivo = async (req: Request<{idCultivo: string}>, res: Response): Promise<void> => {
  try {
    const plagas = await servicioPlaga.listarPlagasPorCultivo(Number(req.params.idCultivo));
    res.status(200).json(plagas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar plagas por cultivo', error });
  }
};

export const actualizarPlaga = async (req: Request<{idPlaga: string}>, res: Response): Promise<void> => {
  try {
    const resultado = await servicioPlaga.actualizarPlaga(Number(req.params.idPlaga), req.body);
    res.status(200).json({ mensaje: 'Plaga actualizada exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar plaga', error });
  }
};

export const cambiarEstadoPlaga = async (req: Request<{idPlaga: string}>, res: Response): Promise<void> => {
  try {
    await servicioPlaga.cambiarEstadoPlaga(Number(req.params.idPlaga), req.body.estado);
    res.status(200).json({ mensaje: 'Estado de la plaga actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar estado de la plaga', error });
  }
};

export const asociarPlagaCultivo = async (req: Request<{idPlaga: string}>, res: Response): Promise<void> => {
  try {
    await servicioPlaga.asociarPlagaCultivo(Number(req.params.idPlaga), req.body.idCultivo);
    res.status(200).json({ mensaje: 'Plaga asociada al cultivo exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al asociar plaga al cultivo', error });
  }
};

export const actualizarUmbral = async (req: Request<{idPlaga: string}>, res: Response): Promise<void> => {
  try {
    await servicioPlaga.actualizarUmbralAlerta(Number(req.params.idPlaga), req.body.umbralAlerta);
    res.status(200).json({ mensaje: 'Umbral de alerta actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar umbral de alerta', error });
  }
};