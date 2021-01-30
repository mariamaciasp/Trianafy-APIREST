import { Router } from 'express';
import { PlayListController } from '../controller/play_list';
import { token } from '../service/passport';

const router = Router ();

//play list

router.get('/', token(), PlayListController.allPlayList);
router.get('/:id', token(), PlayListController.playListById);
router.post('/', token(), PlayListController.createPlayList);
router.put('/:id', token(), PlayListController.editPlayList);
router.delete('/:id', token(), PlayListController.deletePlayList);

// con canciones de la play list
router.get('/:id_playList/songs', token(), PlayListController.songsPlayList);
router.get('/:id_playList/songs/:id_song', token(), PlayListController.songsPlayListById);
router.post('/:id_playList/songs/:id_song', token(), PlayListController.addSongToPlayList); 

router.delete('/:id_playList/songs/:id_song', token(), PlayListController.deleteSongPlayList);

export default router;

