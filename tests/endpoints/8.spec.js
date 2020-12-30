import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.config.js';
import { emptyCallback } from '../../src/utils/callbacks.js';

export default async () => {
    const MESSAGE = '8.  DELETE  /game/:id';
    return fetch(`http://${ HOST }:${ TEST_PORT }/game/2`, {
        method: 'DELETE'
    })
        .then(res => res.status === 204)
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};