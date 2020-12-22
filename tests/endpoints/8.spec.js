import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/servers.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import getCurrentDateTime from '../../src/utils/getCurrentDateTime.js';

export default async () => {
    return fetch(`http://${ HOST }:${ TEST_PORT }/game/1`, {
        method: 'DELETE'
    })
        .then(res => {
            const MESSAGE = `DELETE /game/:id | Status: ${ res.status }`;
            return ((res.status >= 400) ? colors.red(MESSAGE + ` | ${ getCurrentDateTime() }.log`) : colors.green(MESSAGE));
        })
        .catch(emptyCallback);
};