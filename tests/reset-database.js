// Imports
import mysql from 'mysql2';
import fs from 'fs';
import { promisify } from 'util';
import { emptyCallback } from '../src/utils/callbacks.js';

/**
 * Resets data in database for testing
 */
export default async () => {
    // Opens a temporary connection to reset the database
    const CONN = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: 3306,
        database: 'spgames',
        multipleStatements: true
    });
    // Read SQL Query from reset.sql script
    const RESET_SQL = await promisify(fs.readFile)('./sql/reset.sql')
        .then(sql => sql.toString().replace(/[\r\n]/g, ''))
        .catch(emptyCallback);

    // Query the MySQL Database to reset it
    CONN.connect(connErr => {
        if (connErr) {
            throw connErr;
        }
        else {
            //@ts-ignore
            CONN.query(RESET_SQL, (queryErr, result) => {
                CONN.end();
                return;
            });
        }
    });
};
