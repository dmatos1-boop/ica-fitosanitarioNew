import { Router } from 'express';
import { 
  crearUsuario, 
  obtenerUsuario, 
  listarUsuarios, 
  actualizarUsuario, 
  desactivarUsuario,
  cambiarEstadoUsuario
} from '../UsuarioControlador';
import { verificarToken, verificarRol } from '../FiltroAutenticacion';

const router = Router();

router.post('/', crearUsuario);
router.get('/', verificarToken, verificarRol(['FUNCIONARIO_ICA']), listarUsuarios);
router.get('/:identificacion', verificarToken, obtenerUsuario);
router.put('/:identificacion', verificarToken, verificarRol(['FUNCIONARIO_ICA']), actualizarUsuario);
router.patch('/:identificacion', verificarToken, verificarRol(['FUNCIONARIO_ICA']), cambiarEstadoUsuario);
router.delete('/:identificacion', verificarToken, verificarRol(['FUNCIONARIO_ICA']), desactivarUsuario);

export default router;