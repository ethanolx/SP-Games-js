import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/servers.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import getCurrentDateTime from '../../src/utils/getCurrentDateTime.js';

export default async () => {
    return fetch(`http://${ HOST }:${ TEST_PORT }/user/1/game/2/review/`, {
        method: 'POST',
        body: JSON.stringify({
            content: "Enjoyed the game! The story and gameplay was good!",
            rating: 5.0
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            const MESSAGE = `10. POST /user/:uid/game/:gid/review | Status: ${ res.status }`;
            return ((res.status >= 400) ? colors.red(MESSAGE + ` | ${ getCurrentDateTime() }.log`) : colors.green(MESSAGE));
        })
        .catch(emptyCallback);
};