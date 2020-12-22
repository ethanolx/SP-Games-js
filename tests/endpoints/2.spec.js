import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/servers.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import getCurrentDateTime from '../../src/utils/getCurrentDateTime.js';

export default async () => {
    return fetch(`http://${ HOST }:${ TEST_PORT }/users`, {
        method: 'POST',
        body: JSON.stringify({
            username: "Terry Tan",
            email: "terry@gmail.com",
            type: "Customer",
            profile_pic_url: "https://www.abc.com/terry.jpg"
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            const MESSAGE = `POST /users | Status: ${ res.status }`;
            return ((res.status >= 400) ? colors.red(MESSAGE + ` | ${getCurrentDateTime()}.log`) : colors.green(MESSAGE));
        })
        .catch(emptyCallback);
};