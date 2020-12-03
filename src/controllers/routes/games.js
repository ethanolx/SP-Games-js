// Dependencies
import express from 'express';
import { json, urlencoded } from 'body-parser';

// Model
import Games from '../../models/Games.js';

/**@type {express.Router} */
const router = express.Router();

// Parsing Middleware
router.use(json());
router.use(urlencoded({ extended: false }));

// Route Handlers
router.route('/game')
    .post((req, res) => {
        /** @type {import('../../models/Games.js').Game} */
        const GAME = req.body;
        Games.insert(GAME, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json({ 'Affected Rows': result.affectedRows });
            }
        });
    });

router.route('/games/:platform')
    .get((req, res) => {
        const {platform} = req.params;
        Games.findByPlatform(platform, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.status(200).json(result);
            }
        });
    });

router.route('/game/:id')
    .put((req, res) => {
        /**@type {import('../../models/Games.js').Game} */
        const GAME = req.body;
        const {id} = req.params;
        const gameid = parseInt(id);
        if (isNaN(gameid)) {
            res.sendStatus(400);
            return;
        }
        Games.update(GAME, gameid, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json(result.affectedRows);
            }
        });
    })
    .delete((req, res) => {
        const {id} = req.params;
        const gameid = parseInt(id);
        if (isNaN(gameid)) {
            res.sendStatus(400);
            return;
        }
        Games.delete(gameid, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.sendStatus(204);
            }
        });
    });

export default router;