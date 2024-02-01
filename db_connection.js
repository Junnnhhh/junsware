const maria = require('mariadb');

const pool = maria.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    connectionLimit: 5,
    dateStrings: true,
});

module.exports = pool;