import Music from '../modelo/Music.js';

// Obtener todas las músicas
export const getAllMusic = async (req, res) => {
    try {
        const music = await Music.findAll();
        res.status(200).send({ status: "ok", data: music });
    } catch (error) {
        console.error(`Error al obtener la música: ${error.message}`);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
};

// Obtener una música por ID
export const getMusicById = async (req, res) => {
    try {
        const music = await Music.findByPk(req.params.id);
        if (music) {
            res.status(200).send({ status: "ok", data: music });
        } else {
            res.status(404).send({ status: "Error", message: "Música no encontrada" });
        }
    } catch (error) {
        console.error(`Error al obtener la música: ${error.message}`);
        res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
};

// Registrar una nueva música
export const registerMusic = async (req, res) => {
    const { title, author, type, description } = req.body;
    const audioFile = req.file ? req.file.path : null;
    if (!title || !author || !type || !description || !audioFile) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }
    try {
        const newMusic = await Music.create({ title, author, type, description, audioFile });
        console.log(`Música ${newMusic.title} registrada con éxito`);
        return res.status(201).send({ status: "ok", message: `Música ${newMusic.title} agregada`, redirect: "/admin" });
    } catch (error) {
        console.error(`Error durante el registro de la música: ${error.message}`);
        return res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
};

// Editar una música existente
export const editMusic = async (req, res) => {
    const { title, author, type, description } = req.body;
    const audioFile = req.file ? req.file.path : null;
    const id = req.params.id; // Obtener el ID de los parámetros de la URL

    if (!id || !title || !author || !type || !description) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }
    try {
        const music = await Music.findByPk(id);
        if (!music) {
            return res.status(404).send({ status: "Error", message: "Música no encontrada" });
        }
        await music.update({ title, author, type, description, audioFile: audioFile || music.audioFile });
        console.log(`Música ${music.title} actualizada con éxito`);
        return res.status(200).send({ status: "ok", message: `Música ${music.title} actualizada`, redirect: "/admin" });
    } catch (error) {
        console.error(`Error durante la actualización de la música: ${error.message}`);
        return res.status(500).send({ status: "Error", message: "Error interno del servidor" });
    }
};
