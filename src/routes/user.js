import { Router } from 'express';
import { param } from 'express-validator';
import { UserController } from '../controller/user';
import { validar } from '../middlewares/validacion';

const router = Router();

router.get('/', UserController.todosLosUsuarios);
router.get('/:id', [param('id').isInt().withMessage('ID debe ser un número entero')], validar,
    UserController.usuarioPorId);
router.post('/', UserController.nuevoUsuario);
router.put('/:id', UserController.editarUsuario);
router.delete('/:id', UserController.eliminarUsuario);

export default router;