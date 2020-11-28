import app from './controllers/app.js';

const PORT = 3000;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server started and listening on http://${HOST}:${PORT} ...`);
});