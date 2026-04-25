import { Router } from 'express';
import {
  solicitarInspeccion,
  programarInspeccion,
  asignarTecnico,
  registrarResultadoFitosanitario,
  registrarResultadoTecnico,
  consultarInspecciones,
  consultarInspeccionesAsignadas,
  cancelarInspeccion
} from '../InspeccionControlador';
import { verificarToken, verificarRol } from '../FiltroAutenticacion';

const router = Router();

router.post('/', verificarToken, verificarRol(['PRODUCTOR', 'FUNCIONARIO_ICA']), solicitarInspeccion);
router.put('/:idOrden/programar', verificarToken, verificarRol(['FUNCIONARIO_ICA']), programarInspeccion);
router.patch('/:idOrden/tecnico', verificarToken, verificarRol(['FUNCIONARIO_ICA']), asignarTecnico);
router.post('/:idOrden/fitosanitaria', verificarToken, verificarRol(['TECNICO']), registrarResultadoFitosanitario);
router.post('/:idOrden/tecnica', verificarToken, verificarRol(['TECNICO']), registrarResultadoTecnico);
router.get('/', verificarToken, consultarInspecciones);
router.get('/asignadas/:documentoTecnico', verificarToken, verificarRol(['TECNICO']), consultarInspeccionesAsignadas);
router.patch('/:idOrden/cancelar', verificarToken, verificarRol(['FUNCIONARIO_ICA']), cancelarInspeccion);

export default router;