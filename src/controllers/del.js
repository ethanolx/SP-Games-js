import express from 'express';
import Games from '../models/Games.js';
import Platforms from '../models/Platforms.js';
import { emptyCallback } from '../utils/callbacks.js';

let router = express.Router();

router.get('/a', (req, res) => {
    Games.findByPlatform('PC', null, (err, result) => {
        res.send(result);
    });
});

export default router;