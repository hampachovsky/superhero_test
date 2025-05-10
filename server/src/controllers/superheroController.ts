import { Request, Response } from 'express';

import { Superhero } from '../models/Superhero';
import { clearFiles } from '../utils/clearFiles';
import { removeFiles } from '../utils/removeFiles';

const superheroController = {
  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;
      const totalItems = await Superhero.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);

      const superheroes = await Superhero.find()
        .select('nickname Images')
        .skip(skip)
        .limit(limit);
      res.status(200).json({
        data: superheroes,
        page,
        totalPages,
        totalItems,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch superheroes' });
    }
  },
  async getById(req: Request, res: Response) {
    try {
      const superheroId = req.params.id;
      if (!superheroId) {
        res.status(400).json({ error: 'Superhero id not provided' });
        return;
      }
      const superhero = await Superhero.findById(superheroId);
      if (!superhero) {
        res.status(404).json({ error: 'Superhero not found' });
        return;
      }
      res.status(200).json(superhero);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch superhero' });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      } = req.body;

      const candidate = await Superhero.findOne({ nickname });
      if (candidate) {
        res.status(409).json({ error: 'Superhero already exist' });
        if (req.files) removeFiles(req.files as Express.Multer.File[]);
        return;
      }

      const Images = req.files
        ? (req.files as Express.Multer.File[]).map(
            (file: Express.Multer.File) => `/uploads/${file.filename}`,
          )
        : [];

      const newHero = new Superhero({
        nickname,
        real_name,
        origin_description,
        catch_phrase,
        Images,
      });
      if (typeof superpowers === 'string') {
        newHero.superpowers = superpowers
          .split(',')
          .map((power: string) => power.trim());
      } else {
        newHero.superpowers = superpowers;
      }

      const savedHero = await newHero.save();
      res.status(201).json(savedHero);
    } catch (error) {
      if (req.files) removeFiles(req.files as Express.Multer.File[]);
      console.log(error);
      res.status(400).json({ error: 'Failed create superhero' });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const hero = await Superhero.findById(req.params.id);
      if (!hero) {
        res.status(404).json({ message: 'Superhero not found' });
        return;
      }

      const {
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
      } = req.body;

      if (nickname) hero.nickname = nickname;
      if (real_name) hero.real_name = real_name;
      if (origin_description) hero.origin_description = origin_description;
      if (superpowers) {
        if (typeof superpowers === 'string') {
          hero.superpowers = superpowers.split(',');
        } else {
          hero.superpowers = superpowers;
        }
      }

      let existingImages = [];

      if (typeof req.body.existingImages === 'string') {
        existingImages = req.body.existingImages.split(',').filter(Boolean);
      } else if (Array.isArray(req.body.existingImages)) {
        existingImages = req.body.existingImages.filter(Boolean);
      }
      const oldImagesToDelete = hero.Images.filter(
        (img) => !existingImages.includes(img),
      );
      clearFiles(oldImagesToDelete);

      if (catch_phrase) hero.catch_phrase = catch_phrase;
      if (req.files) {
        const newImages = (req.files as Express.Multer.File[]).map(
          (file) => `/uploads/${file.filename}`,
        );
        hero.Images = [...existingImages, ...newImages];
      }
      const updatedHero = await hero.save();
      res.status(202).json({ updatedHero, existingImages });
    } catch (err) {
      if (req.files) removeFiles(req.files as Express.Multer.File[]);
      res.status(500).json({ message: 'Error updating superhero', error: err });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const superheroId = req.params.id;
      if (!superheroId)
        res.status(400).json({ error: 'Superhero id not provided' });
      const hero = await Superhero.findById(superheroId);
      if (!hero) {
        res.status(404).json({ error: 'Superhero not found' });
        return;
      }
      if (hero.Images.length > 0) {
        clearFiles(hero.Images);
      }
      await Superhero.deleteMany({ _id: superheroId });
      res.status(200).json(null);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'failed delete superhero' });
    }
  },
};

export default superheroController;
