import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import User from '../modelo/User.js';

dotenv.config();

async function revisarCookie(req) {
    try {
        const cookieJWT = req.cookies.jwt; // Utiliza req.cookies.jwt para obtener la cookie
        if (!cookieJWT) return false;

        const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        const usuariosARevisar = await User.findOne({ where: { user: decodificada.user } });
        if (!usuariosARevisar) {
            return false;
        }
        return true;
    } catch (error) {
        console.error(`Error al revisar la cookie: ${error.message}`);
        return false;
    }
}

async function soloAdmin(req, res, next) {
    const logueado = await revisarCookie(req);
    if (logueado) return next();
    return res.redirect("/");
}

async function soloPublico(req, res, next) {
    const logueado = await revisarCookie(req);
    if (!logueado) return next();
    return res.redirect("/admin");
}

export const methods = {
    soloAdmin,
    soloPublico,
};
