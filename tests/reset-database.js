import mysql from 'mysql2';
import fs from 'fs';
import { promisify } from 'util';

export default async () => {
    const CONN = mysql.createConnection({
        host: 'localhost',
        user: 'ethan',
        password: '12345Abc',
        port: 3306,
        database: 'spgames',
        multipleStatements: true
    });
    const RESET_SQL = await promisify(fs.readFile)('./sql/reset.sql').then(sql => sql.toString().replace(/[\r\n]/g, '')).catch(_ => { });
    CONN.connect(connErr => {
        if (connErr) {
            console.log(connErr);
        }
        else {
            //@ts-ignore
            CONN.query(RESET_SQL, (queryErr, result) => {
                CONN.end();
                return;
            });
        }
    });
    return;
};
