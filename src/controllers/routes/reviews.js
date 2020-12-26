// Dependencies
import express from 'express';
import { json, urlencoded } from 'body-parser';

// Utilities
import { invalidBody, invalidId } from '../../utils/common-errors.js';

// Model
import Reviews from '../../models/Reviews.js';

/**@type {express.Router} */
const router = express.Router();

// Parsing Middleware
router.use(json());
router.use(urlencoded({ extended: false }));

// Route Handlers
router.route('/game/:id/review')
    .get((req, res) => {
        const GAME_ID = parseInt(req.params.id);
        if (invalidId(req.params.id, res)) {
            return;
        }
        Reviews.findByGame(GAME_ID, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                res.status(200).json(result);
            }
        });
    });

router.route('/user/:uid/game/:gid/review')
    .post((req, res) => {
        /**@type {import('../../models/Reviews.js').Review} */
        const REVIEW = req.body;
        const { uid, gid } = req.params;
        const USER_ID = parseInt(uid);
        const GAME_ID = parseInt(gid);
        if (invalidId(uid, res) || invalidId(gid, res) || invalidBody(REVIEW, {
            content: 'string',
            rating: 'number'
        }, res)) {
            return;
        }
        Reviews.insert(USER_ID, GAME_ID, REVIEW, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json({ reviewid: result.insertId });
            }
        });
    });

export default router;