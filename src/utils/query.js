import getConnection from '../config/connection.js';
import './callback.js';

/**
 * @param {string} sql
 * @param {Callback} fn
 * @param {any} [params]
 * @param {Callback} [customFn]
 * @returns {void}
 */
export default (sql, fn, params = null, customFn = null) => {
    const conn = getConnection();
    conn.connect(connErr => {
        if (connErr) {
            console.log(connErr);
            conn.end();
        }
        else {
            if (customFn === null) {
                conn.query(sql, params, (queryErr, result) => {
                    conn.end();
                    if (queryErr) {
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
                conn.query(sql, params, (queryErr, result) => {
                    conn.end();
                    return customFn(queryErr, result);
                });
            }
        }
    });
}