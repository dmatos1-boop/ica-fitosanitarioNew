import { Router } from 'express';
import {
  solicitarPredio,
  obtenerPredio,
  listarPrediosPorProductor,
  actualizarPredio,
  gestionarEstado,
  listarTodosPredios
} from '../PredioControlador';
import { verificarToken, verificarRol } from '../FiltroAutenticacion';

const router = Router();

router.get('/', verificarToken, listarTodosPredios);
router.post('/', verificarToken, verificarRol(['PRODUCTOR', 'FUNCIONARIO_ICA']), solicitarPredio);
router.get('/productor/:nroDocProductor', verificarToken, listarPrediosPorProductor);
router.get('/:nroRegistroICA', verificarToken, obtenerPredio);
router.put('/:nroRegistroICA', verificarToken, verificarRol(['FUNCIONARIO_ICA']), actualizarPredio);
router.patch('/:nroRegistroICA/estado', verificarToken, verificarRol(['FUNCIONARIO_ICA']), gestionarEstado);

export default router;