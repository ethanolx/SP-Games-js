import mysql from 'mysql2';

export default () => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'spgames',
    port: 3306
});