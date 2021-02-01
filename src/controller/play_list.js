import { songRepository } from '../models/song'
import { playListRepository } from '../models/play_list'
import mongoose from 'mongoose';

const PlayListController = {

    allPlayList: async (req, res) => {
        const data = await playListRepository.findAll(/*req.user.id*/);
        if(Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    playListById: async (req, res) => {
        let playList = await playListRepository.findById(req.params.id);
        if(playList != undefined)
            res.json(playList);
        else
            res.sendStatus(404);
    },
    
    songsPlayList: async (req, res) => {
        let playList = await playListRepository.findById(req.params.id_playList);
        if(playList != undefined){
            res.json(playList.songs);
        }else{
            res.sendStatus(400);
        }
    },
 
    songsPlayListById: async (req, res) => { 
        let song = await playListRepository.findSongId(req.params.id_playList, req.params.id_song);

        if(song != undefined) {
            res.json(song);
        } else {
            res.status(404).json({mensaje: "La canción no está en la play list"})
        }
    },

    createPlayList: async (req, res) => {
        try {
            let newPlayList = await playListRepository.create({
                name: req.body.name,
                description: req.body.description,
                user_id: req.user.id,
                songs: []
            });
            res.status(201).json(newPlayList);
        } catch {
            res.status(400).json({Error: `Se ha producido un error: ${error.message}`})
        }
    },

    editPlayList: async (req, res) => {
        let findPlayList = await playListRepository.findById(req.params.id);
        if(findPlayList.user_id.id == req.user.id && mongoose.Types.ObjectId.isValid(req.params.id)) {
            let editPlayList = await playListRepository.updateById(req.params.id, {
                name: req.body.name,
                description: req.body.description,
                user_id: req.user.id,
            });
            if (editPlayList == undefined ) 
                res.status(404);
            else
                res.status(204).json(editPlayList);
        }
        else
            res.sendStatus(400);
    },

    deletePlayList: async (req, res) => {
        let deleteList = await playListRepository.delete(req.params.id, req.user.id);
        res.sendStatus(204);
    },

    addSongToPlayList: async (req, res) => {
        let song = await songRepository.findById(req.params.id_song);
        if(song != undefined) {
            let play_list = await playListRepository.findById(req.params.id_playList);
            //let findSongPlayList = await this.songsPlayListById(req.params.id_playList, req.params.id_song);
            //console.log(findSongPlayList);
            let findSongPlayList = await playListRepository.findSongId(req.params.id_playList, req.params.id_song);
            console.log(findSongPlayList);
            if(play_list != undefined && findSongPlayList == undefined && req.user.id == play_list.user_id.id) {
                play_list.songs.push(song);
                await play_list.save();
                res.json(await playListRepository.findById(play_list._id));
            }else if(req.user.id != play_list.user_id.id){
                res.status(401).json({
                    mensaje: "Error de usuario autenticado"
                });
            }else if(findSongPlayList != undefined){
                res.status(404).json({
                    mensaje: `La play canción con ID:  ${req.params.id_song} ya está en la play list.`
                });
            }else{
                res.status(404).json({
                    mensaje: `La play list con ID:  ${req.params.id_playList} no está en la base de datos.`
                });
            }     
        }else{ 
            res.status(404).json({
                mensaje: `La canción con ID: ${req.params.id_song} no está registrada en la base de datos`
            });
        }
    },
  
    deleteSongPlayList: async (req, res) => {
        let play_list = await playListRepository.findById(req.params.id_playList);
        if(play_list != undefined && req.user.id == play_list.user_id.id) {
            play_list.songs.pull(req.params.id_song);
            await play_list.save();
            res.status(204).json(await playListRepository.findById(play_list._id));
        }else if(req.user.id != play_list.user_id.id){
            res.status(400).json({
                mensaje: "Error de usuario autenticado"
            })
        }else{
            res.status(404).json({
                mensaje: `La play list con ID: ${req.params.id_playList} no está registrada en la base de datos`
            });
        }
    }

};

export {
    PlayListController
}