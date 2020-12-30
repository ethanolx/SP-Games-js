import fetch from 'node-fetch';
import colors from 'colors';
import { TEST_PORT, HOST } from '../../src/config/server.config.js';
import { emptyCallback } from '../../src/utils/callbacks.js';
import compareObjectToSignature from '../../src/utils/compare-object-to-signature.js';

export default async () => {
    const MESSAGE = '2.  POST    /users';
    return fetch(`http://${ HOST }:${ TEST_PORT }/users`, {
        method: 'POST',
        body: JSON.stringify({
            username: "Terry Tan",
            email: "terry@gmail.com",
            type: "Customer",
            profile_pic_url: "https://www.abc.com/terry.jpg"
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
                        userid: 'number'
                    });
                }
            })
        .then(success =>
            (success ? colors.green : colors.red)(MESSAGE)
        )
        .catch(emptyCallback);
};