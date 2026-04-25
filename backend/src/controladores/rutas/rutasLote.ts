import { Router } from 'express';
import {
  registrarLote,
  obtenerLote,
  listarLotesPorLugar,
  actualizarLote,
  cambiarEstadoLote,
  listarTodosLotes
} from '../LoteControlador';
import { verificarToken, verificarRol } from '../FiltroAutenticacion';

const router = Router();

router.get('/', verificarToken, listarTodosLotes);
router.post('/', verificarToken, verificarRol(['FUNCIONARIO_ICA']), registrarLote);
router.get('/lugar/:nroRegICAlugar', verificarToken, listarLotesPorLugar);
router.get('/:idLote', verificarToken, obtenerLote);
router.put('/:idLote', verificarToken, verificarRol(['FUNCIONARIO_ICA']), actualizarLote);
router.patch('/:idLote/estado', verificarToken, verificarRol(['FUNCIONARIO_ICA']), cambiarEstadoLote);

export default router;