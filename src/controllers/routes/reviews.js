// Dependencies
import express from 'express';
import { json, urlencoded } from 'body-parser';

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
        const { id } = req.params;
        const gameid = parseInt(id);
        if (isNaN(gameid)) {
            res.sendStatus(400);
            return;
        }
        Reviews.findByGame(gameid, (err, result) => {
            if (err) {
                console.log(err);
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
        const userid = parseInt(uid);
        const gameid = parseInt(gid);
        if (isNaN(userid) || isNaN(gameid)) {
            res.sendStatus(400);
        }
        Reviews.insert(userid, gameid, REVIEW, (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                res.status(201).json({ reviewid: result.insertId });
            }
        });
    });

export default router;