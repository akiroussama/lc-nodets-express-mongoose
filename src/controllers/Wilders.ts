import WilderModel from './../models/Wilder';
import express from 'express';

const controller = {
    findAll: async (req: express.Request, res: express.Response): Promise<void> => {
        const wilders = await WilderModel.find({});
        res.json(wilders);
    },

    findOne: async (req: express.Request, res: express.Response): Promise<void> => {
        const wilder = await WilderModel.findById(req.params.id);
        res.json(wilder);
    },

    delete: async (req: express.Request, res: express.Response): Promise<void> => {
        const wilder = await WilderModel.findById(req.params.id);

        if (wilder) {
            await wilder.remove();
        }

        res.json(wilder);
    },

    // req = request, res = response
    update: async (req: express.Request, res: express.Response): Promise<void> => {
        const wilder = await WilderModel.findById(req.params.id);
        
        if (wilder) {
            wilder.name = req.body.name;
            wilder.city = req.body.city;
            wilder.skills = req.body.skills;

            await wilder.save();
            res.json(wilder);
        } else {
            res.status(404).json({ message: 'not_found' });
        }
    },

    partialUpdate: async (req: express.Request, res: express.Response): Promise<void> => {
        const wilder = await WilderModel.findById(req.params.id);

        if (wilder) {
            Object.assign(wilder, req.body);
            await wilder.save();
            res.json(wilder);
        } else {
            res.status(404).json({ message: 'not_found' });
        }
    },

    create: async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            await WilderModel.init();
            const newWilder = new WilderModel(req.body);
            const result = await newWilder.save();
            res.json(result);
        } catch (err: any) {
            if (err.code === 11000) {
                res.status(400).json({ message: 'Name already taken' });
            }
            throw err;
        }
    }
}

export default controller;