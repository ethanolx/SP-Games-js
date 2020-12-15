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
    const LOG_FILES = await promisify(readdir)(LOG_FILE_DIR).catch(handleOperationError);
    if (typeof LOG_FILES === 'object' && LOG_FILES.length >= limit) {
        promisify(unlink)(join('./logs/history', LOG_FILES[0])).catch(handleOperationError);
    }
    promisify(writeFile)(join(LOG_FILE_DIR, NEW_LOG_ENTRY) + '.log', data, { flag: 'wx' }).catch(handleOperationError);
}

/**
 * @param {Error} opErr
 */
function handleOperationError(opErr) {
    throw opErr;
}