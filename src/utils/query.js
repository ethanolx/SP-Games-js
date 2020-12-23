import getConnection from '../config/database.js';
import { logError, logHistory } from './logs.js';

/**
 * @param {string} sql
 * @param {import('./callbacks.js').Callback} fn
 * @param {any} [params]
 * @param {import('./callbacks.js').Callback | null} [customFn]
 * @returns {void}
 */
export default (sql, fn, params = null, customFn = null) => {
    const conn = getConnection();
    conn.connect(connErr => {
        if (connErr) {
            logError(connErr);
            conn.end();
        }
        else {
            /** @type {import('mysql2/typings/mysql/lib/protocol/sequences/Query')} */
            let query;
            if (customFn === null) {
                query = conn.query(sql, params, (queryErr, result) => {
                    logHistory(query.sql, (queryErr ? false : true), {
                        user: conn.config.user || 'unknown',
                        database: conn.config.database || 'unknown'
                    });
                    conn.end();
                    if (queryErr) {
                        logError(queryErr);
                        return fn(queryErr, null);
                    }
                    // @ts-ignore
                    else if (Object.keys(result).includes('length') && (result.length === 0)) {
                        return fn(null, null);
                    }
                    else {
                        return fn(null, result);
                    }
                });
            }
            else {
                query = conn.query(sql, params, (queryErr, result) => {
                    logHistory(query.sql, (queryErr ? false : true), {
                        user: conn.config.user || 'unknown',
                        database: conn.config.database || 'unknown'
                    });
                    conn.end();
                    return customFn(queryErr, result);
                });
            }

        }
    });
};