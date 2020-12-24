import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import getCurrentDateTime from '../../src/utils/getCurrentDateTime.js';

export default async () => {
    const MESSAGE = '6.  POST    /game';
    return fetch(`http://${ HOST }:${ TEST_PORT }/game`, {
        method: 'POST',
        body: JSON.stringify({
            title: "Assassin’s Creed Valhalla",
            description: "Assassin's Creed Valhalla is an action role-playing video game developed by Ubisoft Montreal and published by Ubisoft",
            price: 69.90,
            platformids: [1, 2],
            categoryids: [3],
            year: 2020
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            if (res.status === 201) {
                return res.json();
            }
            else {
                return false;
            }
        })
        .then(body => {
            if (body === false) {
                return body;
            }
            else {
                const ATTRS = Object.keys(body);
                return ATTRS.length === 1 && ATTRS.includes('gameid') && (typeof body['gameid']) === 'number';
            }
        })
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};