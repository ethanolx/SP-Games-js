// Dependencies
import express from 'express';
import {json, urlencoded} from 'body-parser';

// Model
import Users from '../../models/Users.js';

/**@type {express.Router} */
const router = express.Router();

// Parsing Middleware
router.use(json());
router.use(urlencoded({extended: false}));

// Route Handlers
router.route('/users')
    .get((req, res) => {
        Users.findAll((err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else if (result === null) {
                res.status(200).json([]);
            }
            else {
                res.status(200).json(result);
            }
        });
    })
    .post((req, res) => {
        /**@type {import('../../models/Users.js').User} */
        const USER = req.body;
        Users.insert(USER, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json({'Affected Rows': result.affectedRows});
            }
        });
    });

router.route('/users/:id')
    .get((req, res) => {
        const USERID = parseInt(req.params.id);
        if (isNaN(USERID)) {
            res.sendStatus(400);
        }
        Users.findOne(USERID, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else if (result === null) {
                res.sendStatus(404);
            }
            else {
                res.status(200).json(result[0]);
            }
        });
    });

export default router;