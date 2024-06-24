import express from "express";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./app/controllers/authentication.controller.js";
import { methods as authorization } from "./app/middlewares/authorization.js";
import musicRoutes from './app/routes/musicRoutes.js';
import sequelize from './app/db.js';

(async () => {
    try {
        await sequelize.sync();
        console.log('Base de datos sincronizada');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
})();

const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));

app.use(express.static(__dirname + "/app/public"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos desde el directorio uploads
app.use(express.json());
app.use(cookieParser());

app.get("/", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/app/pages/login.html"));
app.get("/register", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/app/pages/register.html"));
app.get("/admin", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/app/pages/admin/admin.html"));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);
app.use('/musics', musicRoutes); // Usa las rutas de las músicas

export default app;
