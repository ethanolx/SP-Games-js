// Dependencies
import express from 'express';

/**@type {express.Router} */
const router = express.Router();

// Route Handler (universal)
router.all('*', (req, res) => {
    res.status(303).redirect('/');
});

export default router;