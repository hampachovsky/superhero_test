import { Request, Response } from 'express';

import fs from 'fs';
import { Superhero } from '../models/Superhero';
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

            if (nickname) hero.nickname = nickname;
            if (real_name) hero.real_name = real_name;
            if (origin_description) hero.origin_description = origin_description;
            if (superpowers) hero.superpowers = superpowers;
            if (catch_phrase) hero.catch_phrase = catch_phrase;

            if (req.files) {
                hero.Images.forEach((image) => {
                    const imagePath = image.split('/').pop();
                    fs.unlinkSync(`src/${image}`);
                });
                const newImages = (req.files as Express.Multer.File[]).map(
                    (file) => `/uploads/${file.filename}`,
                );
                hero.Images = newImages;
            }
            const updatedHero = await hero.save();
            res.status(202).json(updatedHero);
        } catch (err) {
            if (req.files) removeFiles(req.files as Express.Multer.File[]);
            res.status(500).json({ message: 'Error updating superhero', error: err });
        }
    },
};

export default superheroController;
