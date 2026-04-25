import { Router } from 'express';
import {
  crearCultivo,
  obtenerCultivo,
  listarCultivos,
  actualizarCultivo,
  cambiarEstadoCultivo
} from '../CultivoControlador';
import { verificarToken, verificarRol } from '../FiltroAutenticacion';

const router = Router();

router.post('/', verificarToken, verificarRol(['FUNCIONARIO_ICA']), crearCultivo);
router.get('/', verificarToken, listarCultivos);
router.get('/:idCultivo', verificarToken, obtenerCultivo);
router.put('/:idCultivo', verificarToken, verificarRol(['FUNCIONARIO_ICA']), actualizarCultivo);
router.patch('/:idCultivo/estado', verificarToken, verificarRol(['FUNCIONARIO_ICA']), cambiarEstadoCultivo);

export default router;