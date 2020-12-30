import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.config.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import compareObjectToSignature from '../../src/utils/compare-object-to-signature.js';

export default async () => {
    const MESSAGE = '3.  GET     /users/:id';
    return fetch(`http://${ HOST }:${ TEST_PORT }/users/1`, {
        method: 'GET'
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                return false;
            }
        })
        .then(
            /**
             * @param {{}[] | false} body
             * @returns {boolean}
             */
            body => {
                if (body === false) {
                    return body;
                }
                else {
                    return compareObjectToSignature(body, {
                        userid: 'number',
                        username: 'string',
                        email: 'string',
                        profile_pic_url: 'string?',
                        type: 'string',
                        created_at: 'string'
                    });
                }
            })
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};