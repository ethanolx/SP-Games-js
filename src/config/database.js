import mysql from 'mysql2';

export default () => mysql.createConnection({
    host: 'localhost',
    user: 'ethan',
    password: '12345Abc',
    database: 'spgames',
    port: 3306
});