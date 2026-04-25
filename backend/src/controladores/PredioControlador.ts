import { Request, Response } from 'express';
import { ServicioPredioImpl } from '../servicios/implementaciones/ServicioPredioImpl';

const servicioPredio = new ServicioPredioImpl();

export const solicitarPredio = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await servicioPredio.solicitarRegistroPredio(req.body);
    res.status(201).json({ mensaje: 'Predio registrado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar predio', error });
  }
};

export const obtenerPredio = async (req: Request<{nroRegistroICA: string}>, res: Response): Promise<void> => {
  try {
    const predio = await servicioPredio.consultarPredio(req.params.nroRegistroICA);
    if (!predio) {
      res.status(404).json({ mensaje: 'Predio no encontrado' });
    } else {
      res.status(200).json(predio);
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar predio', error });
  }
};

export const listarPrediosPorProductor = async (req: Request<{nroDocProductor: string}>, res: Response): Promise<void> => {
  try {
    const predios = await servicioPredio.listarPrediosPorProductor(req.params.nroDocProductor);
    res.status(200).json(predios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar predios', error });
  }
};

export const actualizarPredio = async (req: Request<{nroRegistroICA: string}>, res: Response): Promise<void> => {
  try {
    const resultado = await servicioPredio.actualizarDatosPredio(req.params.nroRegistroICA, req.body);
    res.status(200).json({ mensaje: 'Predio actualizado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar predio', error });
  }
};

export const listarTodosPredios = async (req: Request, res: Response): Promise<void> => {
  try {
    const predios = await servicioPredio.listarTodosPredios();
    res.status(200).json(predios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar predios', error });
  }
};

export const gestionarEstado = async (req: Request<{nroRegistroICA: string}>, res: Response): Promise<void> => {
  try {
    await servicioPredio.gestionarEstadoPredio(req.params.nroRegistroICA, req.body.estado);
    res.status(200).json({ mensaje: 'Estado del predio actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al gestionar estado del predio', error });
  }
};