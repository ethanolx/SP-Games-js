import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.config.js';
import { emptyCallback } from '../../src/utils/callbacks.js';

export default async () => {
    const MESSAGE = '4.  POST    /category';
    return fetch(`http://${ HOST }:${ TEST_PORT }/category`, {
        method: 'POST',
        body: JSON.stringify({
            catname: "Action",
            description: "An action game emphasizes physical challenges, including hand–eye coordination and reaction-time"
        }),
        headers: { 'content-type': 'application/json' }
    })
        .then(res => res.status === 204)
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};