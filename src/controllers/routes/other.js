// Dependencies
import express from 'express';

/**@type {express.Router} */
const router = express.Router();

// Route Handler (universal)
router.all('*', (req, res) => {
    res.redirect('/');
});

export default router;