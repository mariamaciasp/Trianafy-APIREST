import { Router } from 'express';
import { SongController } from '../controller/song';
import { token } from '../service/passport';

const router = Router ();

router.get('/', token(), SongController.allSong);
router.get('/:id', token(), SongController.songById);
router.post('/', token(), SongController.createSong);
router.put('/:id', token(), SongController.editSong);
router.delete('/:id', token(), SongController.deleteSong);

export default router;
