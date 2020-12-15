import log from './log.js';

/**
 * @param {Error} err
 */
export function logError(err) {
    const NOW = new Date();
    const RECORD =
        `DATE:\t${ NOW.getDate() }/${ NOW.getMonth() + 1 }/${ NOW.getFullYear() }
TIME:\t${ NOW.getHours() }:${ NOW.getMinutes() }:${ NOW.getSeconds() }
-----------------------------
NAME:\t\t${ err.name }
CODE:\t\t${ err.
            // @ts-ignore
            code || null }
MESSAGE:\t${ err.message }`;
    log(RECORD, './logs/error', 8).catch(err => { throw err; });
}

/**
 * @param {string} query
 * @param {boolean} success
 * @param {{
 *      user: string
 *      database: string
 * }} conn
 */
export function logHistory(query, success, conn) {
    const NOW = new Date();
    const RECORD =
        `DATE:\t${ NOW.getDate() }/${ NOW.getMonth() + 1 }/${ NOW.getFullYear() }
TIME:\t${ NOW.getHours() }:${ NOW.getMinutes() }:${ NOW.getSeconds() }
-----------------------------
USER WHO QUERIED:\t${ conn.user }
DATABASE QUERIED:\t${ conn.database }
-----------------------------
MYSQL QUERY:\t${ query }
QUERY STATUS:\t${ success ? 'SUCCESS' : 'FAILURE' }`;
    log(RECORD, './logs/history', 10).catch(err => { throw err; });
}