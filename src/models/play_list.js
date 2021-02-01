import 'dotenv/config';

import mongoose from 'mongoose';

const { Schema } = mongoose;

const playListSchema = new Schema ({
    name: String,
    description: String,
    user_id: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    songs: [{
        type: mongoose.ObjectId,
        ref: 'Song'
    }]
}, {versionKey: false});

const Play_list = mongoose.model('Play_list', playListSchema);


const playListRepository = {

    async findAll(/*userId*/) {
        return await 
            Play_list.find(/*{user_id: userId,}*/).
            populate('user_id','_id').
            populate('songs').
            exec();

    },
    async findById(id) {
        return await 
            Play_list.findById(id).
            populate('user_id','_id').
            populate('songs').
            exec();
    },

    async findSongId(playList_id, id_song) {
          // "songs.id": id_song
        const list = await Play_list.findOne({_id: playList_id}).
            populate('user_id','_id').
            populate({
                path: 'songs',
                match: {
                    _id: id_song
                }
            }).
            exec();
        return list.songs[0]
    },

    async create(newPlayList){
        const pL = new Play_list ({
            name: newPlayList.name,
            description: newPlayList.description,
            user_id: newPlayList.user_id,
            songs: []
        });
        const result = await pL.save();
        return result;
    },

    async updateById(id, modifiedPL){
        const playL = await Play_list.findById(id);

        if(playL != null){
            return await Object.assign(playL, modifiedPL).save();
        }else{
            return undefined;
        }
    },

    async delete(id, id_user) {
        await Play_list.deleteOne({
            _id:id,
            user_id: id_user 
        }).exec();
    },

    toDto(playList){
        return {
            id: playList.id,
            name: playList.name,
            description: playList.description,
            user_id: playList.user_id,
            songs: playList.songs
        }
    }


};

/*class Play_list {
    constructor(id, name, description, user_id, songs) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.user_id = user_id;
        this.songs = songs;
    }
}*/

export {
    Play_list,
    playListRepository
}