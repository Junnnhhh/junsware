const pool = require('./db_connection.js');
const app = require('./init.js');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/memo', async (req, res) => {
    const conn = await pool.getConnection();

    const rows = await conn.query('SELECT * FROM junsware.memo');

    res.send(rows);
});

app.post('/memo', async (req, res) => {
    const conn = await pool.getConnection();
    
    const add = await conn.query(
        "INSERT INTO junsware.memo (title, body)"
        + " value (?, ?, ?)", 
        [req.body.title, req.body.form]);
    
    res.send("success");

    conn.release();
});

app.get('/create-memo', (req, res) => {
    res.sendFile(__dirname + '/create-memo.html');
});

app.get('/memo/:id', async (req, res) => {
    const conn = await pool.getConnection();

    var id = req.params.id;

    const data = await conn.query(
        'SELECT title, body FROM junsware.memo WHERE seq = ?'
    , [id]);
    
    res.render(__dirname + '/memo', data[0]);
});