import 'dotenv/config';
import { User, userRepository } from '../models/user';
import bcrypt from 'bcryptjs';
import { JwtService } from '../service/jwt';


const AuthController = {

    register: async (req, res, next) => {
    
        let usuarioCreado = await userRepository.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))
        });

        // Devolvemos todos los datos del usuario menos la contraseña                
        res.status(201).json({
            name: usuarioCreado.name,
            username: usuarioCreado.username,
            email: usuarioCreado.email
        });
    },
    login: async (req, res, next) => {
        // Dado que la mitad del esfuerzo lo hace la función password del servicio passport
        // Aquí tan solo tenemos que preocuparnos de generar y devolver el token
        const token = await JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });
    }
}

export {
    AuthController
}