import getConnection from '../config/database.js';
import { logError, logHistory } from '../utils/log.js';

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
            console.log(connErr);
            logError(connErr);
            conn.end();
        }
        else {
            /** @type {import('mysql2/typings/mysql/lib/protocol/sequences/Query')} */
            let query;
            if (customFn === null) {
                query = conn.query(sql, params, (queryErr, result) => {
                    conn.end();
                    if (queryErr) {
                        logError(queryErr);
                        logHistory(query.sql, false, {
                            user: conn.config.user || '',
                            database: conn.config.database || ''
                        });
                        return fn(queryErr, null);
                    }
                    // @ts-ignore
                    else if (Object.keys(result).includes('length') && (result.length === 0)) {
                        logHistory(query.sql, true, {
                            user: conn.config.user || '',
                            database: conn.config.database || ''
                        });
                        return fn(null, null);
                    }
                    else {
                        logHistory(query.sql, true, {
                            user: conn.config.user || '',
                            database: conn.config.database || ''
                        });
                        return fn(null, result);
                    }
                });
            }
            else {
                query = conn.query(sql, params, (queryErr, result) => {
                    conn.end();
                    return customFn(queryErr, result);
                });
            }
        }
    });
};