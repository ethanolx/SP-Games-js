import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.config.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import compareObjectToSignature from '../../src/utils/compare-object-to-signature.js';

export default async () => {
    const MESSAGE = '11. GET     /game/:id/review';
    return fetch(`http://${ HOST }:${ TEST_PORT }/game/1/review`)
        .then(res => (res.status === 200 ? res.json() : false))
        .then(
            /**
             * @param {{}[] | false} body
             */
            body => {
                if (body === false) {
                    return body;
                }
                else {
                    return body.map(review => compareObjectToSignature(review, {
                        gameid: 'number',
                        content: 'string',
                        rating: 'number',
                        username: 'string',
                        created_at: 'string'
                    })).reduce((a, b) => a && b);
                }
            }
        )
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};