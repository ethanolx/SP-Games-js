// Dependencies
import express from 'express';
import { readFile } from 'fs';
import { promisify } from 'util';

// Utilities
import { logError } from '../../utils/logs.js';

// Configurations
import { HOST, PORT } from '../../config/server.config.js';

/**@type {express.Router} */
const router = express.Router();

// Route Handler (universal)
router.all('/', async (req, res) => {
    const TEMPLATE_OR_VOID = await promisify(readFile)('./assets/endpoints-supported.html').catch(logError);
    const TEMPLATE = (TEMPLATE_OR_VOID ? TEMPLATE_OR_VOID.toString()
        .replace(/\$host\$/, HOST)
        .replace(/\$port\$/, PORT.toString()) : '');
    res.status(200).type('html').send(TEMPLATE);
});

export default router;