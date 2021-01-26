import { Song, songRepository} from '../models/song';

const SongController = {

    allSong: async (req, res) => {
        const data = await songRepository.findAll();
        if(Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },

    songById: async (req, res) => {
        let song = await songRepository.findById(req.params.id);
        if(song != undefined)
            res.json(song);
        else
            res.sendStatus(404);
    },

    createSong: async (req, res) => {
        let newSong = await songRepository.create({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year
        })
        res.status(201).json(newSong);
        // poner un else if y si newSong.title == null tal y si no lo otro
        // Si el nombre de la canción no es válido (por ejemplo, es nulo), debe devolver 400 Bad Request
    },

    editSong: async (req, res) => {
        let editSong = await songRepository.updateById(req.params.id, {
            //id: req.body.id, // esto está bien?? poner ahí el id para el else if de conflicto???
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year
        });
        if (editSong != undefined) 
            res.status(200).json(editSong);
        //else if (req.params.id != req.body.id)
        //    res.status(409);
        else
            res.sendStatus(404);
    },

    deleteSong: async (req, res) => {
        await songRepository.delete(req.params.id);
        res.sendStatus(204);
    }

};

export {
    SongController
}