import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.config.js';
import { emptyCallback } from '../../src/utils/callbacks.js';

export default async () => {
    const MESSAGE = '5.  PUT     /category/:id';
    return fetch(`http://${ HOST }:${ TEST_PORT }/category/5`, {
        method: 'PUT',
        body: JSON.stringify({
            catname: "Action",
            description: "Rife with, you guessed it, action..."
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.status === 204)
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};