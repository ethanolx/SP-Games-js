// Imports
import getConnection from '../config/database.config.js';
import { logError, logHistory } from './logs.js';

/**
 * ## Usual process of querying MySQL Server
 *
 * + ERROR:
 *      - log error
 *      - handle the error
 * + NO ERROR:
 *      - handle the result
 * + EITHER CASE:
 *      - log MySQL query
 *
 * \* _A custom function can be provided to handle errors & results differently_
 * @param {string} sql
 * @param {import('./callbacks.js').Callback} fn
 * @param {any} [params]
 * @param {import('./callbacks.js').Callback | null} [customFn]
 * @returns {void}
 */
export default (sql, fn, params = null, customFn = null) => {
    const CONN = getConnection();
    CONN.connect(connErr => {
        if (connErr) {
            logError(connErr);
            CONN.end();
        }
        else {
            /** @type {import('mysql2/typings/mysql/lib/protocol/sequences/Query')} */
            let query;
            if (customFn === null) {
                query = CONN.query(sql, params, (queryErr, result) => {
                    logHistory(query.sql, (queryErr ? false : true), {
                        user: CONN.config.user || 'unknown',
                        database: CONN.config.database || 'unknown'
                    });
                    CONN.end();
                    if (queryErr) {
                        logError(queryErr);
                        return fn(queryErr, null);
                    }
                    else if (result instanceof Array && (result.length === 0)) {
                        return fn(null, null);
                    }
                    else {
                        return fn(null, result);
                    }
                });
            }
            else {
                query = CONN.query(sql, params, (queryErr, result) => {
                    logHistory(query.sql, (queryErr ? false : true), {
                        user: CONN.config.user || 'unknown',
                        database: CONN.config.database || 'unknown'
                    });
                    CONN.end();
                    return customFn(queryErr, result);
                });
            }
        }
    });
};