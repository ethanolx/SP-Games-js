import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import getCurrentDateTime from '../../src/utils/getCurrentDateTime.js';

export default async () => {
    return fetch(`http://${ HOST }:${ TEST_PORT }/game/1/review`)
        .then(res => {
            const MESSAGE = `11. GET /game/:id/review | Status: ${ res.status }`;
            return ((res.status >= 400) ? colors.red(MESSAGE + ` | ${ getCurrentDateTime() }.log`) : colors.green(MESSAGE));
        })
        .catch(emptyCallback);
};