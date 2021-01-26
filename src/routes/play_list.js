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
// hay que hacer algo en la consulta de mostrar listas para que solo muestre al usuario las suyas!! y sus canciones claro
router.get('/:id_playList/songs', token(), PlayListController.songsPlayList);
router.get('/:id_playList/songs/:id_song', token(), PlayListController.songsPlayListById); // ESTE NO FUNCIONA
router.post('/:id_playList/songs/:id_song', token(), PlayListController.addSongToPlayList); 
// probar para no meter dos iguales en la misma lista

router.delete('/:id_playList/songs/:id_song', token(), PlayListController.deletePlayList);
// NO BORRA LA CANCIÓN 

export default router;

