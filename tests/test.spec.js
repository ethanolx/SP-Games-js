// Imports
import app from '../src/controllers/app.js';
import { TEST_PORT } from '../src/config/server.config.js';
import resetDatabase from "./reset-database.js";

// Endpoint Specifications (base)
import e1 from './endpoints/1.spec.js';
import e2 from './endpoints/2.spec.js';
import e3 from './endpoints/3.spec.js';
import e4 from './endpoints/4.spec.js';
import e5 from './endpoints/5.spec.js';
import e6 from './endpoints/6.spec.js';
import e7 from './endpoints/7.spec.js';
import e8 from './endpoints/8.spec.js';
import e9 from './endpoints/9.spec.js';
import e10 from './endpoints/10.spec.js';
import e11 from './endpoints/11.spec.js';

const SERVER = app.listen(TEST_PORT, () => {
    console.log('Initiating tests...\n');
});

// Register Endpoints For Testing
async function test() {
    console.log(await e1());
    console.log(await e2());
    console.log(await e3());
    console.log(await e4());
    console.log(await e5());
    console.log(await e6());
    console.log(await e7());
    console.log(await e8());
    console.log(await e9());
    console.log(await e10());
    console.log(await e11());
    SERVER.close(_ => console.log('\nEnd tests.'));
}

resetDatabase().then(_ => setTimeout(test, 2000));