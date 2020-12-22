import { logError } from "./log.js";

/**
 * @typedef {(queryErr: import("mysql2").QueryError | null, result: import("mysql2").RowDataPacket[] | import("mysql2").RowDataPacket[][] | import("mysql2").OkPacket | import("mysql2").OkPacket[] | import("mysql2").ResultSetHeader | null) => void} Callback
 */

/**
 * @param {Error} opErr
 */
export const handleOperationError = (opErr) => {
    throw opErr;
};

/**
 * @param {Error} err
 * @param {any} result
 */
export const simpleCallbackErrorHandler = (err, result) => {
    if (err) {
        console.log(err);
        logError(err);
    }
};

/**
 * @param {any} _
 * @param {any} __
 */
export const emptyCallback = (_, __) => { };