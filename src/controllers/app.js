// Dependencies
import express from 'express';

// Routers
import root from './routes/root.js';
import users from './routes/users.js';
import games from './routes/games.js';
import categories from './routes/categories.js';
import reviews from './routes/reviews.js';
import other from './routes/other.js';

//%     API Registration Module     %//

/** @type {express.Express} */
const app = express();

app
    .use('/', root)
    .use('/', users)
    .use('/', games)
    .use('/', categories)
    .use('/', reviews)
    .use('/', other);

export default app;