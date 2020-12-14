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
        Categories.insert(CATEGORY, (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(err.code === 'ER_DUP_ENTRY' ? 422 : 500);
            }
            else {
                //@ts-ignore
                res.status(204).json(result.affectedRows);
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
            res.sendStatus(400);
            return;
        }
        Categories.update(CATEGORY, categoryid, (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(err.code === 'ER_DUP_ENTRY' ? 422 : 500);
            }
            else {
                res.sendStatus(204);
            }
        });
    });

export default router;