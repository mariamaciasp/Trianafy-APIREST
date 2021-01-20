import { Router } from 'express';

const router = Router();

router.get('/',(req, res) => {
    res.send("¡Hola Mundo!");
});
router.get('/me', /* método controlador */);
router.get('/:id', /* método controlador */);

export default router;