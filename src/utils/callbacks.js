/**
 * @typedef {(queryErr: import("mysql2").QueryError | null, result: import("mysql2").RowDataPacket[] | import("mysql2").RowDataPacket[][] | import("mysql2").OkPacket | import("mysql2").OkPacket[] | import("mysql2").ResultSetHeader | null) => void} Callback
 */

export function handleOperationError(opErr) {
    throw opErr;
}

export const simpleCallbackErrorHandler = (err, result) => {
    if (err) {
        console.log(err);
        logError(err);
    }
};

export const emptyCallback = (_, __) => { };