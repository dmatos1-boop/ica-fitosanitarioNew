import { Router } from 'express';
import {
  crearPlaga,
  obtenerPlaga,
  listarPlagas,
  listarPlagasPorCultivo,
  actualizarPlaga,
  cambiarEstadoPlaga,
  asociarPlagaCultivo,
  actualizarUmbral
} from '../PlagaControlador';
import { verificarToken, verificarRol } from '../FiltroAutenticacion';

const router = Router();

router.post('/', verificarToken, verificarRol(['FUNCIONARIO_ICA']), crearPlaga);
router.get('/', verificarToken, listarPlagas);
router.get('/:idPlaga', verificarToken, obtenerPlaga);
router.get('/cultivo/:idCultivo', verificarToken, listarPlagasPorCultivo);
router.put('/:idPlaga', verificarToken, verificarRol(['FUNCIONARIO_ICA']), actualizarPlaga);
router.patch('/:idPlaga/estado', verificarToken, verificarRol(['FUNCIONARIO_ICA']), cambiarEstadoPlaga);
router.post('/:idPlaga/cultivo', verificarToken, verificarRol(['FUNCIONARIO_ICA']), asociarPlagaCultivo);
router.patch('/:idPlaga/umbral', verificarToken, verificarRol(['FUNCIONARIO_ICA']), actualizarUmbral);

export default router;