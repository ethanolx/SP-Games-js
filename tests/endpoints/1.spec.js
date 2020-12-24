import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.js';
import { emptyCallback } from '../../src/utils/callbacks.js';

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
        .then(body => {
            if (body === false) {
                return body;
            }
            else {
                return body.map(sample => {
                    const KEYS = Object.keys(sample);
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
                    return REQUIRED_KEYS.map(spec => KEYS.includes(spec.key) && spec.type === typeof sample[spec.key]).reduce((a, b) => a && b) && (typeof sample['profile_pic_url'] === 'string' || sample['profile_pic_url'] === null) && ['Customer', 'Admin'].includes(body['type']);
                }).reduce((a, b) => a && b);
            }
        })
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};