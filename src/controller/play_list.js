import { songRepository } from '../models/song'
import { playListRepository } from '../models/play_list'

const PlayListController = {

    allPlayList: async (req, res) => {
        const data = await playListRepository.findAll();
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

    createPlayList: async (req, res) => {
        let newPlayList = await playListRepository.create({
            name: req.body.name,
            description: req.body.description,
            user_id: req.user.id,
            songs: []
        })
        res.status(201).json(newPlayList);
    },

    editPlayList: async (req, res) => {
        let editPlayList = await playListRepository.updateById(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            user_id: req.user.id,
            songs: req.body.songs
        });
        if (editPlayList != undefined) 
            res.status(200).json(editPlayList);
        else
            res.sendStatus(404);
    },

    deletePlayList: async (req, res) => {
        await playListRepository.delete(req.params.id);
        res.sendStatus(204);
    },

    addSongToPlayList: async (req, res) => {
        let song = await songRepository.findById(req.params.id_song);
        if(song != undefined) {
            let play_list = await playListRepository.findById(req.params.id_playList);
            if(play_list != undefined) {
                play_list.songs.push(song);
                await play_list.save();
                res.json(await playListRepository.findById(play_list._id));
            }else{
                res.status(400).json({
                    mensaje: `La play list con ID:  ${req.params.id_playList} no está en la base de datos.`
                });
            }     
        }else{ 
            res.status(400).json({
                mensaje: `La canción con ID: ${req.params.id_song} no está registrada en la base de datos`
            });
        }
    },

    deleteSongPlayList: async (req, res) => {
        let play_list = await playListRepository.findById(req.params.id_playList);
        if(play_list != undefined) {
            play_list.songs.pull(req.params.id_song);
            await play_list.save();
            res.json(await playListRepository.findById(play_list._id));
        }else{
            res.status(400).json({
                mensaje: `La play list con ID: ${req.params.id_playList} no está registrada en la base de datos`
            });
        }
    }


};