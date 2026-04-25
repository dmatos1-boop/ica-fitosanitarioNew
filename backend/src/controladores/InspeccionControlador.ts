import { Request, Response } from 'express';
import { ServicioInspeccionImpl } from '../servicios/implementaciones/ServicioInspeccionImpl';

const servicioInspeccion = new ServicioInspeccionImpl();

export const solicitarInspeccion = async (req: Request, res: Response): Promise<void> => {
  try {
    const resultado = await servicioInspeccion.solicitarInspeccion(req.body);
    res.status(201).json({ mensaje: 'Inspección solicitada exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al solicitar inspección', error });
  }
};

export const programarInspeccion = async (req: Request<{idOrden: string}>, res: Response): Promise<void> => {
  try {
    const resultado = await servicioInspeccion.programarInspeccion(Number(req.params.idOrden), req.body);
    res.status(200).json({ mensaje: 'Inspección programada exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al programar inspección', error });
  }
};

export const asignarTecnico = async (req: Request<{idOrden: string}>, res: Response): Promise<void> => {
  try {
    await servicioInspeccion.asignarTecnico(Number(req.params.idOrden), req.body.documentoTecnico);
    res.status(200).json({ mensaje: 'Técnico asignado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al asignar técnico', error });
  }
};

export const registrarResultadoFitosanitario = async (req: Request<{idOrden: string}>, res: Response): Promise<void> => {
  try {
    const resultado = await servicioInspeccion.registrarResultadoFitosanitario(Number(req.params.idOrden), req.body);
    res.status(201).json({ mensaje: 'Resultado fitosanitario registrado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar resultado fitosanitario', error });
  }
};

export const registrarResultadoTecnico = async (req: Request<{idOrden: string}>, res: Response): Promise<void> => {
  try {
    const resultado = await servicioInspeccion.registrarResultadoTecnico(Number(req.params.idOrden), req.body);
    res.status(201).json({ mensaje: 'Resultado técnico registrado exitosamente', datos: resultado });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar resultado técnico', error });
  }
};

export const consultarInspecciones = async (req: Request, res: Response): Promise<void> => {
  try {
    const filtros = {
      estado: req.query.estado,
      tipoInspeccion: req.query.tipoInspeccion,
      nroRegICAlugar: req.query.nroRegICAlugar
    };
    const inspecciones = await servicioInspeccion.consultarInspecciones(filtros);
    res.status(200).json(inspecciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar inspecciones', error });
  }
};

export const consultarInspeccionesAsignadas = async (req: Request<{documentoTecnico: string}>, res: Response): Promise<void> => {
  try {
    const inspecciones = await servicioInspeccion.consultarInspeccionesAsignadas(req.params.documentoTecnico);
    if (inspecciones.length === 0) {
      res.status(200).json({ mensaje: 'No tiene inspecciones asignadas', datos: [] });
    } else {
      res.status(200).json(inspecciones);
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar inspecciones asignadas', error });
  }
};
export const cancelarInspeccion = async (req: Request<{idOrden: string}>, res: Response): Promise<void> => {
  try {
    await servicioInspeccion.cancelarInspeccion(Number(req.params.idOrden), req.body.motivo);
    res.status(200).json({ mensaje: 'Inspección cancelada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cancelar inspección', error });
  }
};