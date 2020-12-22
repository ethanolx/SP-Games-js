import { promisify } from 'util';
import { writeFile, readdir, unlink } from 'fs';
import { join } from 'path';
import getCurrentDateTime from './getCurrentDateTime.js';

/**
 * @param {string} data
 * @param {string} logFileDir
 * @param {number} limit
 */
export default async function log(data, logFileDir, limit) {
    const LOG_FILE_DIR = logFileDir;
    const NEW_LOG_ENTRY = `${ getCurrentDateTime() }`;
    const LOG_FILES = await promisify(readdir)(LOG_FILE_DIR).catch(_ => {});
    if (typeof LOG_FILES === 'object' && LOG_FILES.length >= limit) {
        //@ts-ignore
        promisify(unlink)(join(LOG_FILE_DIR, LOG_FILES.sort((a, b) => a - b)[0])).catch(_ => {});
    }
    promisify(writeFile)(join(LOG_FILE_DIR, NEW_LOG_ENTRY) + '.log', data, { flag: 'wx' }).catch(_ => {});
}

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
    log(RECORD, './logs/error', 8).catch(_ => {});
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
    log(RECORD, './logs/history', 10).catch(_ => {});
}