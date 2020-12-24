import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import getCurrentDateTime from '../../src/utils/getCurrentDateTime.js';

export default async () => {
    return fetch(`http://${ HOST }:${ TEST_PORT }/game/3`, {
        method: 'PUT',
        body: JSON.stringify({
            title: "Assassin’s Creed Valhalla",
            description: "Assassin's Creed Valhalla is an action role-playing video game developed by Ubisoft Montreal and published by Ubisoft",
            price: 69.90,
            platformids: [1],
            categoryids: [1],
            year: 2020
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            const MESSAGE = `9. PUT /game/:id | Status: ${ res.status }`;
            return ((res.status >= 400) ? colors.red(MESSAGE + ` | ${ getCurrentDateTime() }.log`) : colors.green(MESSAGE));
        })
        .catch(emptyCallback);
};