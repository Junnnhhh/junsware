const maria = require('mariadb');
const dotenv = require('dotenv');

dotenv.config();

const pool = maria.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_ID,
    password: process.env.DB_PW,
    connectionLimit: 1000,
    dateStrings: true,
});

module.exports = pool;