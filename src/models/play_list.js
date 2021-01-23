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
});

const Play_list = mongoose.model('Play_list', playListSchema);


const playListRepository = {

    async findAll() {

        return await 
            Play_list.find({}).
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

    async create(user, newPlayList){
        const pL = new Play_list ({
            name: newPlayList.name,
            description: newPlayList.description,
            user_id: user
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

    async delete(id) {
        await Play_list.findByIdAndRemove(id).exec();
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