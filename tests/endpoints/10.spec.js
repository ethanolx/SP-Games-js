import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.config.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import compareObjectToSignature from '../../src/utils/compare-object-to-signature.js';

export default async () => {
    const MESSAGE = '10. POST    /user/:uid/game/:gid/review';
    return fetch(`http://${ HOST }:${ TEST_PORT }/user/1/game/3/review/`, {
        method: 'POST',
        body: JSON.stringify({
            content: "Enjoyed the game! The story and gameplay was good!",
            rating: 5.0
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => (res.status === 201 ? res.json() : false))
        .then(
            /**
             * @param {{}[] | false} body
             */
            body => {
                if (body === false) {
                    return body;
                }
                else {
                    return compareObjectToSignature(body, {
                        reviewid: 'number'
                    });
                }
            }
        )
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};