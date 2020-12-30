// Dependencies
import { promisify } from 'util';
import { extname, join } from 'path';
import { writeFile, readdir, unlink } from 'fs';

// Configurations
import { MAX_ERROR_LOGS, MAX_HISTORY_LOGS } from '../config/server.config.js';

// Utilities
import getCurrentDateTime from './get-current-date-and-time.js';
import { emptyCallback } from './callbacks.js';

/**
 * Generic log generator utility
 * @param {string} data
 * @param {string} logFileDir
 * @param {number} limit
 */
async function log(data, logFileDir, limit) {
    const NEW_LOG_ENTRY = `${ getCurrentDateTime() }`;
    promisify(writeFile)(join(logFileDir, NEW_LOG_ENTRY) + '.log', data, { flag: 'wx' }).catch(emptyCallback);
    trimLogs(logFileDir, limit);
}

/**
 * Used to limit the number of log files in a specified directory
 * @param {string} logFileDir
 * @param {number} limit
 */
async function trimLogs(logFileDir, limit) {
    let LOG_FILES = await getFilesInDir(logFileDir, '.log');
    if (LOG_FILES.length > limit) {
        do {
            // @ts-ignore
            promisify(unlink)(join(logFileDir, LOG_FILES.sort((a, b) => a - b)[0])).catch(emptyCallback);
            LOG_FILES = await getFilesInDir(logFileDir, '.log');
        }
        while (LOG_FILES.length > limit);
    }
    return;
}

/**
 * Retrieves the names of the files in a specified directory
 * @param {string} dir
 * @param {string | null} [ext]
 */
async function getFilesInDir(dir, ext = null) {
    const FILES_IN_DIR = await promisify(readdir)(dir).catch(emptyCallback);
    if (FILES_IN_DIR instanceof Array) {
        if (ext) {
            return FILES_IN_DIR.filter(fileName => extname(fileName) === ext);
        }
        else {
            return FILES_IN_DIR;
        }
    }
}

/**
 * Generates a log file for an error
 *
 * Log files can be found in 'logs/error'
 * @param {Error} err
 */
function logError(err) {
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
    log(RECORD, './logs/error', MAX_ERROR_LOGS).catch(emptyCallback);
};

/**
 * Generates a log file for a mysql query
 *
 * Log files can be found in 'logs/history'
 * @param {string} query
 * @param {boolean} success
 * @param {{
 *      user: string
 *      database: string
 * }} conn
 */
function logHistory(query, success, conn) {
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
    log(RECORD, './logs/history', MAX_HISTORY_LOGS).catch(emptyCallback);
};

export { logError, logHistory };