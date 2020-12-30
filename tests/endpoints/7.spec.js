import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.config.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import compareObjectToSignature from '../../src/utils/compare-object-to-signature.js';

export default async () => {
    const MESSAGE = '7.  GET     /games/:platform';
    return fetch(`http://${ HOST }:${ TEST_PORT }/games/PC`, {
        method: 'GET'
    })
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
                    return body.map(game => compareObjectToSignature(game, {
                        gameid: 'number',
                        title: 'string',
                        description: 'string',
                        price: 'number',
                        platforms: [{
                            pid: 'number',
                            platform: 'string',
                            version: 'string?'
                        }],
                        categories: [{
                            catid: 'number',
                            catname: 'string'
                        }],
                        year: 'number?',
                        created_at: 'string'
                    })).reduce((a, b) => a && b);
                }
            })
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};