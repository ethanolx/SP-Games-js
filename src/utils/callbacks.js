import { logError } from "./logs.js";

/**
 * @typedef {(queryErr: import("mysql2").QueryError | null, result: import("mysql2").RowDataPacket[] | import("mysql2").RowDataPacket[][] | import("mysql2").OkPacket | import("mysql2").OkPacket[] | import("mysql2").ResultSetHeader | null) => void} Callback
 */

/**
 * @param {Error} err
 */
export const throwErr = (err) => { throw err; };

/**
 * @param {Error} err
 * @param {any} result
 */
export const simpleCallbackErrorHandler = (err, result) => { if (err) { logError(err); } };

/**
 * @param {any} [_]
 * @param {any} [__]
 */
export const emptyCallback = (_ = undefined, __ = undefined) => { };