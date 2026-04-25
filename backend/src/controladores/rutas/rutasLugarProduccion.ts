import { Router } from 'express';
import {
  solicitarLugar,
  obtenerLugar,
  listarLugaresPorProductor,
  actualizarLugar,
  gestionarEstadoLugar,
  listarTodosLugares
} from '../LugarProduccionControlador';
import { verificarToken, verificarRol } from '../FiltroAutenticacion';

const router = Router();

router.get('/', verificarToken, listarTodosLugares);
router.post('/', verificarToken, verificarRol(['PRODUCTOR', 'FUNCIONARIO_ICA']), solicitarLugar);
router.get('/productor/:nroDocProductor', verificarToken, listarLugaresPorProductor);
router.get('/:nroRegistroICA', verificarToken, obtenerLugar);
router.put('/:nroRegistroICA', verificarToken, verificarRol(['FUNCIONARIO_ICA']), actualizarLugar);
router.patch('/:nroRegistroICA/estado', verificarToken, verificarRol(['FUNCIONARIO_ICA']), gestionarEstadoLugar);

export default router;