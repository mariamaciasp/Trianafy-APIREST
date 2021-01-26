import 'dotenv/config';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const songSchema = new Schema({
    title: String,
    artist: String,
    album: String,
    year: Number
});

const Song = mongoose.model('Song', songSchema);


const songRepository = {
    async findAll() {
        const result = await Song.find({}).exec();
        return result;
    },

    async findById(id) {
        const result = await Song.findById(id).exec();
        return result != null ? result : undefined;
    },

    async create(newSong) {
        const theSong = new Song({
            title: newSong.title,
            artist: newSong.artist,
            album: newSong.album,
            year: newSong.year
        });
        const result = await theSong.save();
        return this.toDto(result); // o result???
    },

    async updateById(id, modifierSong) {
        const songSave = await Song.findById(id);

        if (songSave != null){
            return await Object.assign(songSave, modifierSong).save();
        }else{
            return undefined;
        }
    },

    async delete(id) {
        await Song.findByIdAndRemove(id).exec();
    },

    async toDto(song) {
        return await{
            id: song.id,
            title: song.title,
            artist: song.artist,
            album: song.album,
            year: song.year
        }
    }

};

export {
    Song,
    songRepository
}