import { Router } from 'express';
import superheroController from '../controllers/superheroController';
import { upload } from '../lib/multerConfig';

const superheroRouter = Router();

superheroRouter.post('/superhero', upload, superheroController.create);
superheroRouter.put('/superhero/:id', upload, superheroController.updateSuperhero);

export default superheroRouter;
