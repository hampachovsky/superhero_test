import { Router } from 'express';
import superheroController from '../controllers/superheroController';
import { upload } from '../lib/multerConfig';

const superheroRouter = Router();

superheroRouter.post('/superheroes', upload, superheroController.create);
superheroRouter.put('/superheroes/:id', upload, superheroController.update);
superheroRouter.delete('/superheroes/:id', superheroController.delete);
superheroRouter.get('/superheroes', superheroController.getAll);
superheroRouter.get('/superheroes/:id', superheroController.getById);

export default superheroRouter;
