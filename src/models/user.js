class User {
    constructor(id, name, username, email, password) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
let users = [
    new User(1, 'Luis Miguel López'),
    new User(2, 'Ángel Naranjo')
];

// Método que nos va a permitir obtener la posición de un
// usuario dentro de la colección en base a su ID
// Devuelve la posición si lo encuentra, y -1 si no lo encuentra.
const indexOfPorId = (id) => {
    let posicionEncontrado = -1;
    for (let i = 0; i < users.length && posicionEncontrado == -1; i++) {
        if (users[i].id == id)
            posicionEncontrado = i;
    }
    return posicionEncontrado;
}

const userRepository = {

    // Devuelve todos los usuarios del repositorio
    findAll() {
        return users;
    },
    // Devuelve un usuario por su Id
    findById(id) {
        /*
        let result = users.filter(user => user.id == id);
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
        */
       const posicion = indexOfPorId(id);
       return posicion == -1 ? undefined : users[posicion];
    },
    // Inserta un nuevo usuario y devuelve el usuario insertado
    create(newUser) {
        const lastId = users.length == 0 ? 0 : users[users.length-1].id;
        const newId = lastId + 1;
        const result = new User(newId, newUser.name, newUser.username, newUser.email, newUser.password);
        users.push(result);
        return result;
    },
    // Actualiza un usuario identificado por su ID
    updateById(id, modifiedUser) {
        const posicionEncontrado = indexOfPorId(id)
        if (posicionEncontrado != -1) {
            users[posicionEncontrado].name = modifiedUser.name;
            users[posicionEncontrado].username = modifiedUser.username;
            users[posicionEncontrado].email = modifiedUser.email;
            users[posicionEncontrado].password = modifiedUser.password;
        }
        return posicionEncontrado != -1 ? users[posicionEncontrado] : undefined;
    },

    // Versión del anterior, en la que el ID va dentro del objeto usuario
    update(modifiedUser) {
        return this.update(modifiedUser.id, modifiedUser);
    }, 
    
    delete(id) {
        const posicionEncontrado = indexOfPorId(id);
        if (posicionEncontrado != -1)
            users.splice(posicionEncontrado, 1);
    }

}

export {
    User,
    userRepository
}