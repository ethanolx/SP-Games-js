import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.config.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import compareObjectToSignature from '../../src/utils/compare-object-to-signature.js';

export default async () => {
    const MESSAGE = '1.  GET     /users';
    return fetch(`http://${ HOST }:${ TEST_PORT }/users`, {
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
             */
            body => {
                if (body === false) {
                    return body;
                }
                else {
                    return body.map(user => compareObjectToSignature(user, {
                        userid: 'number',
                        username: 'string',
                        email: 'string',
                        type: 'string',
                        profile_pic_url: 'string?',
                        created_at: 'string'
                    })).reduce((a, b) => a && b);
                }
            })
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};