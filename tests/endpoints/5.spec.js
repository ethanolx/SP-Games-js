import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/servers.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import getCurrentDateTime from '../../src/utils/getCurrentDateTime.js';

export default async () => {
    return fetch(`http://${ HOST }:${ TEST_PORT }/category/1`, {
        method: 'PUT',
        body: JSON.stringify({
            catname: "Action",
            description: "An action game emphasizes physical challenges, including hand–eye coordination and reaction- time"
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            const MESSAGE = `PUT /category/:id | Status: ${ res.status }`;
            return ((res.status >= 400) ? colors.red(MESSAGE + ` | ${getCurrentDateTime()}.log`) : colors.green(MESSAGE));
        })
        .catch(emptyCallback);
};