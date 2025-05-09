import { Request, Response } from 'express';

import { Superhero } from '../models/Superhero';
import { clearFiles } from '../utils/clearFiles';
import { removeFiles } from '../utils/removeFiles';

const superheroController = {
    async create(req: Request, res: Response) {
        try {
            const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

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
                newHero.superpowers = superpowers.split(',').map((power: string) => power.trim());
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
    async updateSuperhero(req: Request, res: Response) {
        try {
            const hero = await Superhero.findById(req.params.id);
            if (!hero) {
                res.status(404).json({ message: 'Superhero not found' });
                return;
            }

            const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

            const existingImages = req.body.existingImages
                ? Array.isArray(req.body.existingImages)
                    ? req.body.existingImages
                    : [req.body.existingImages]
                : [];

            if (nickname) hero.nickname = nickname;
            if (real_name) hero.real_name = real_name;
            if (origin_description) hero.origin_description = origin_description;
            if (superpowers) {
                if (typeof superpowers === 'string') {
                    hero.superpowers = superpowers.split(',').map((power: string) => power.trim());
                } else {
                    hero.superpowers = superpowers;
                }
            }
            const oldImagesToDelete = hero.Images.filter((img) => !existingImages.includes(img));
            clearFiles(oldImagesToDelete);

            if (catch_phrase) hero.catch_phrase = catch_phrase;
            if (Array.isArray(req.files) && req.files.length > 0) {
                // clearFiles(hero.Images);
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
    async deleteSuperhero(req: Request, res: Response) {
        // clearFiles(hero.Images);
    },
};

export default superheroController;
