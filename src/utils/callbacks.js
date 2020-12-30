// Imports
import { logError } from "./logs.js";

/**
 * Common structure for callbacks in mysql queries
 * @callback Callback
 * @param {import("mysql2").QueryError | null} queryError
 * @param {import("mysql2").RowDataPacket[] | import("mysql2").RowDataPacket[][] | import("mysql2").OkPacket | import("mysql2").OkPacket[] | import("mysql2").ResultSetHeader | null} result
 * @returns {void}
 */

/**
 * Logs an error if received
 * @param {Error} err
 * @param {any} result
 */
function simpleCallbackErrorHandler(err, result) { if (err) { logError(err); } };

/**
 * Empty callback function
 * @param {any} [_]
 * @param {any} [__]
 */
function emptyCallback(_ = undefined, __ = undefined) { };

export { emptyCallback, simpleCallbackErrorHandler };