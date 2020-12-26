// Dependencies
import express from 'express';
import { json, urlencoded } from 'body-parser';

// Utilities
import { invalidBody, invalidId } from '../../utils/common-errors.js';

// Model
import Users from '../../models/Users.js';

/**@type {express.Router} */
const router = express.Router();

// Parsing Middleware
router.use(json());
router.use(urlencoded({ extended: false }));

// Route Handlers
router.route('/users')
    .get((req, res) => {
        Users.findAll((err, results) => {
            if (err) {
                res.sendStatus(500);
            }
            else if (results === null) {
                res.status(200).json([]);
            }
            else {
                res.status(200).json(results);
            }
        });
    })
    .post((req, res) => {
        /**@type {import('../../models/Users.js').User} */
        const USER = req.body;
        if (invalidBody(USER, {
            username: 'string',
            email: 'string',
            type: 'string',
            profile_pic_url: 'string?'
        }, res)) {
            return;
        }
        Users.insert(USER, (err, result) => {
            if (err) {
                res.sendStatus(500);
            }
            else {
                //@ts-ignore
                res.status(201).json({ userid: result.insertId });
            }
        });
    });

router.route('/users/:id')
    .get((req, res) => {
        const USER_ID = parseInt(req.params.id);
        if (invalidId(req.params.id, res)) {
            return;
        }
        Users.findOne(USER_ID, (err, result) => {
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