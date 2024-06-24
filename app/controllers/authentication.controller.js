import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../modelo/User.js'; 

dotenv.config();

async function login(req, res) {
    console.log(req.body);
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }
    try {
        const usuariosARevisar = await User.findOne({ where: { user } });
        if (!usuariosARevisar) {
            console.log(`Usuario ${user} no encontrado`);
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }
        const loginCorrecto = await bcryptjs.compare(password, usuariosARevisar.password);
        if (!loginCorrecto) {
            console.log(`Contraseña incorrecta para el usuario ${user}`);
            return res.status(400).send({ status: "Error", message: "Error durante login" });
        }
        const token = jsonwebtoken.sign(
            { user: usuariosARevisar.user },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        const cookieOption = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            path: "/"
        };
        res.cookie("jwt", token, cookieOption);
        console.log(`Usuario ${user} logueado con éxito`);
        res.send({ status: "ok", message: "Usuario logueado", redirect: "/admin" });
    } catch (error) {
        console.error(`Error durante el proceso de login: ${error.message}`);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}


async function register(req, res) {
    const { user, password, email } = req.body;
    if (!user || !password || !email) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    // Imprimir los datos antes de la creación
    //console.log(`Datos recibidos: user=${user}, email=${email}, password=${password}`);

    try {
        const usuariosARevisar = await User.findOne({ where: { user } });
        
        if (usuariosARevisar) {
            console.log(`Usuario ${user} ya existe`);
            return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
        }
    
        const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(password, salt);
        
        const nuevoUsuario = await User.create({
            user,
            email,
            password: hashPassword
        });

        console.log(`Usuario ${nuevoUsuario.user} registrado con éxito`);
        return res.status(201).send({ status: "ok", message: `Usuario ${nuevoUsuario.user} agregado`, redirect: "/" });
    } catch (error) {
        console.error(`Error durante el proceso de registro: ${error.message}`);
        if (error.errors) {
            error.errors.forEach((err) => {
                console.error(`Validation error: ${err.message}`);
            });
        }
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
}


export const methods = {
    login,
    register
};