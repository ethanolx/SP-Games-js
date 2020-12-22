import { promisify } from 'util';
import { writeFile, readdir, unlink } from 'fs';
import { extname, join } from 'path';
import getCurrentDateTime from './getCurrentDateTime.js';

/**
 * @param {string} data
 * @param {string} logFileDir
 * @param {number} limit
 */
async function log(data, logFileDir, limit) {
    const NEW_LOG_ENTRY = `${ getCurrentDateTime() }`;
    trimLogs(logFileDir, limit);
    promisify(writeFile)(join(logFileDir, NEW_LOG_ENTRY) + '.log', data, { flag: 'wx' }).catch(_ => {});
}

/**
 * @param {string} logFileDir
 * @param {number} limit
 */
async function trimLogs(logFileDir, limit) {
    let LOG_FILES = await getFilesInDir(logFileDir, '.log');
    if (LOG_FILES.length >= limit) {
        do {
            //@ts-ignore
            promisify(unlink)(join(logFileDir, LOG_FILES.sort((a, b) => a - b)[0])).catch(_ => {});
            LOG_FILES = await getFilesInDir(logFileDir, '.log');
        }
        while (LOG_FILES.length >= limit);
    }
    return;
}

/**
 * @param {string} dir
 * @param {string | null} [ext]
 */
async function getFilesInDir(dir, ext = null) {
    const FILES_IN_DIR = await promisify(readdir)(dir).catch(_ => {});
    if (typeof FILES_IN_DIR === 'object') {
        if (ext) {
            return FILES_IN_DIR.filter(fileName => extname(fileName) === ext);
        }
        else {
            return FILES_IN_DIR;
        }
    }
    return;
}

/**
 ** don't overuse
 * @param {Error} err
 */
export const logError = (err) => {
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
};

/**
 * @param {string} query
 * @param {boolean} success
 * @param {{
 *      user: string
 *      database: string
 * }} conn
 */
export const logHistory = (query, success, conn) => {
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
    log(RECORD, './logs/history', 20).catch(_ => {});
};