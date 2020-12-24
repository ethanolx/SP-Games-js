import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.js';
import { emptyCallback } from '../../src/utils/callbacks.js';

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
        .then(/**@returns {boolean} */ body => {
            if (body === false) {
                return body;
            }
            else {
                const KEYS = Object.keys(body);
                const REQUIRED_KEYS = [
                    {
                        key: 'userid',
                        type: 'number'
                    },
                    {
                        key: 'username',
                        type: 'string'
                    },
                    {
                        key: 'email',
                        type: 'string'
                    },
                    {
                        key: 'type',
                        type: 'string'
                    },
                    {
                        key: 'created_at',
                        type: 'string'
                    }
                ];
                return REQUIRED_KEYS.map(spec => KEYS.includes(spec.key) && spec.type === typeof body[spec.key]).reduce((a, b) => a && b) && (typeof body['profile_pic_url'] === 'string' || body['profile_pic_url'] === null) && ['Customer', 'Admin'].includes(body['type']);
            }
        })
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};