// Dependencies
import express from 'express';
import { json, urlencoded } from 'body-parser';

// Model
import Categories from '../../models/Categories.js';

/**@type {express.Router} */
const router = express.Router();

// Parsing Middleware
router.use(json());
router.use(urlencoded({ extended: false }));

// Route Handlers
router.route('/category')
    .post((req, res) => {
        /**@type {import('../../models/Categories.js').Category} */
        const CATEGORY = req.body;
        if (!(['catname', 'description'].map(attr => Object.keys(CATEGORY).includes(attr)).reduce((a, b) => a && b))) {
            res.status(400).json({ message: 'Request body has missing attributes' });
            return;
        }
        Categories.insert(CATEGORY, (err, result) => {
            if (err) {
                switch (err.code) {
                    case 'ER_DUP_ENTRY':
                        res.status(422).json({ message: `The category ${ CATEGORY.catname } already exists` });
                        break;
                    default:
                        res.sendStatus(500);
                }
            }
            else {
                res.sendStatus(204);
            }
        });
    });

router.route('/category/:id')
    .put((req, res) => {
        /**@type {import('../../models/Categories.js').Category} */
        const CATEGORY = req.body;
        const { id } = req.params;
        const categoryid = parseInt(id);
        if (isNaN(categoryid)) {
            res.status(400).json({ message: 'Invalid id provided' });
            return;
        }
        if (!(['catname', 'description'].map(attr => Object.keys(CATEGORY).includes(attr)).reduce((a, b) => a && b))) {
            res.status(400).json({ message: 'Request body has missing attributes' });
            return;
        }
        Categories.update(CATEGORY, categoryid, (err, result) => {
            if (err) {
                res.sendStatus(err.code === 'ER_DUP_ENTRY' ? 422 : 500);
            }
            else {
                res.sendStatus(204);
            }
        });
    });

export default router;