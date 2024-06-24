// routes/musicRoutes.js
import { Router } from 'express';
import multer from 'multer';
import { registerMusic, editMusic, getAllMusic, getMusicById } from '../controllers/musicController.js';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Carpeta para almacenar archivos de audio

router.get('/', getAllMusic);
router.get('/:id', getMusicById);
router.post('/', upload.single('audioFile'), registerMusic);
router.put('/:id', upload.single('audioFile'), editMusic);


export default router;
