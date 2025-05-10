import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { MONGO_URI, PORT } from './common/config';
import superheroRouter from './routes/superheroes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('src/uploads'));
app.use('/api', superheroRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('DB connection error:', err));
