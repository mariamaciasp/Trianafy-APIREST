import 'dotenv/config';

import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String 
});

const User = mongoose.model('User', userSchema);


/*
class User {
    constructor(id, name, username, email, password) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    toDto() {
        return {
            id: this.id,
            name: this.name,
            username: this.username, 
            email: this.email
        }
    }
}

const password = bcrypt.hashSync('12345678', parseInt(process.env.BCRYPT_ROUNDS));

let users = [
    new User(1, 'Luis Miguel López', 'lmlopez', 'luismi@email.com', password),
    new User(2, 'Ángel Naranjo', 'anaranjo', 'angel@email.com', password)
];

const emailExists = (email) => {
    let emails = users.map(user => user.email);
    return emails.includes(email);
}
*/
// Método que nos va a permitir obtener la posición de un
// usuario dentro de la colección en base a su ID
// Devuelve la posición si lo encuentra, y -1 si no lo encuentra.
/*
const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < users.length && posicionEncontrado == -1; i++) {
        if (users[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

*/
const usernameExists = async (username) => {
    const result = await User.countDocuments({ username: username}).exec();
    return result > 0;
};

const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result > 0;

};

const userRepository = {

    // Devuelve todos los usuarios del repositorio
    async findAll() {
        //return users;
        const result =  await User.find({}).exec();
        return result;
    },
    // Devuelve un usuario por su Id
    async findById(id) {
       // const posicion = indexOfPorId(id);
       // return posicion == -1 ? undefined : users[posicion];
       const result = await User.findById(id).exec();
       return result != null ? result : undefined;
    },
    async findByUsername(username) {
        const result = await User.find({username: username});
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;   
    },
    // Inserta un nuevo usuario y devuelve el usuario insertado
    async create(newUser) {
        // const lastId = users.length == 0 ? 0 : users[users.length-1].id;
        // const newId = lastId + 1;
        // const result = new User(newUser.username, newUser.email, newId);
        // users.push(result);
        // return result;
        const theUser = new User({
            name: newUser.name,
            username : newUser.username,
            email: newUser.email,
            password: newUser.password
        });
        const result = await theUser.save();
        return result; // Posiblemente aquí nos interese implementar un DTO

    },
    // Actualiza un usuario identificado por su ID
    async updateById(id, modifiedUser) {

        // const posicionEncontrado = indexOfPorId(id)
        // if (posicionEncontrado != -1) {
        //    users[posicionEncontrado].username = modifiedUser.username;
        // }
        // return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
        const userSaved = await User.findById(id);

        if (userSaved != null) {
            return await Object.assign(userSaved, modifiedUser).save();
        } else
            return undefined;


    },
    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    async delete(id) {
        // const posicionEncontrado = indexOfPorId(id);
        // if (posicionEncontrado != -1)
        //     users.splice(posicionEncontrado, 1);
        await User.findByIdAndRemove(id).exec();
    },

    toDto(user) {
        return {
            id: user.id,
            name: user.name,
            username: user.username, 
            email: user.email
        }
    }
    
};


export {
    User,
    userRepository,
    emailExists,
    usernameExists
}