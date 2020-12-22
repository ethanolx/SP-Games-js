import app from './controllers/app.js';
import { PORT, HOST } from './config/servers.js';

app.listen(PORT, HOST, () => {
    console.log(`Server started and listening on http://${ HOST }:${ PORT } ...`);
});