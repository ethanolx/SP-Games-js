// Dependencies
import express from 'express';

/**@type {express.Router} */
const router = express.Router();

// Route Handler (universal)
router.all('/', (req, res) => {
    res.status(200).type('html').send('<h1>Consume our APIs at http://localhost:3000</h1>');
});

export default router;