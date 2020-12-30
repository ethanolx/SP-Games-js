// Dependencies
import express, { json, urlencoded } from 'express';

// Utilities
import { invalidBody, invalidId } from '../../utils/common-errors.js';

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
        if (invalidBody(CATEGORY, {
            catname: 'string',
            description: 'string'
        }, res)) {
            return;
        }
        Categories.insert(CATEGORY, (err, _) => {
            if (err) {
                switch (err.code) {
                    case 'ER_DUP_KEY':
                    case 'ER_DUP_ENTRY':
                        res.status(422).json({ message: `The category \'${ CATEGORY.catname }\' already exists` });
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
        if (invalidId(id, res) || invalidBody(CATEGORY, {
            catname: 'string',
            description: 'string'
        }, res)) {
            return;
        }
        Categories.update(CATEGORY, categoryid, (err, _) => {
            if (err) {
                switch (err.code) {
                    case 'ER_DUP_KEY':
                    case 'ER_DUP_ENTRY':
                        res.status(422).json({ message: `The category \'${ CATEGORY.catname }\' already exists` });
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

export default router;