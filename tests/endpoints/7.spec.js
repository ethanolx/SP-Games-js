import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.js';
import { emptyCallback } from '../../src/utils/callbacks.js';

export default async () => {
    const MESSAGE = '7.  GET     /games/:platform';
    return fetch(`http://${ HOST }:${ TEST_PORT }/games/PC`, {
        method: 'GET'
    })
        .then(res => (res.status === 200 ? res.json() : false))
        .then(body => {
            if (body === false) {
                return body;
            }
            else {
                return body.map(sample => {
                    const KEYS = Object.keys(sample);
                    const REQUIRED_KEYS = [
                        {
                            key: 'gameid',
                            type: 'number'
                        },
                        {
                            key: 'title',
                            type: 'string'
                        },
                        {
                            key: 'description',
                            type: 'string'
                        },
                        {
                            key: 'price',
                            type: 'string'
                        },
                        {
                            key: 'year',
                            type: 'string'
                        },
                        {
                            key: 'created_at',
                            type: 'string'
                        }
                    ];
                    return REQUIRED_KEYS.map(spec => KEYS.includes(spec.key) && spec.type === typeof sample[spec.key]).reduce((a, b) => a && b) &&
                        sample['platforms'] instanceof Array &&
                        sample['platforms'].map(p => typeof p === 'string').reduce((a, b) => a && b) &&
                        sample['categories'] instanceof Array;
                }).reduce((a, b) => a && b);
            }
        })
        .then(success => {
            (success ? colors.green : colors.red)(MESSAGE);
        })
        .catch(emptyCallback);
};