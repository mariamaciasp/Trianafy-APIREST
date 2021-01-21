import { Router } from 'express';
import { UserController } from '../controller/user';
const router = Router();

router.get('/', UserController.todosLosUsuarios);
router.post('/', UserController.nuevoUsuario);
router.put('/:id', UserController.editarUsuario);
router.delete('/:id', UserController.eliminarUsuario);

export default router;