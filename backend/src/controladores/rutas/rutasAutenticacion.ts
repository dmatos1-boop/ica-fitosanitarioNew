import { Router } from 'express';
import { iniciarSesion, cerrarSesion } from '../AutenticacionControlador';

const router = Router();

router.post('/login', iniciarSesion);
router.post('/logout', cerrarSesion);

export default router;