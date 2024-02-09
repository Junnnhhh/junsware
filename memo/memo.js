const pool = require('../db_connection.js');

const express = require('express');
const router = express.Router();

router.get('/list', async (req, res) => {
    const conn = await pool.getConnection();

    const rows = await conn.query('SELECT * FROM junsware.memo');

    res.render(__dirname + '/ejs/memo_list.ejs', {rows});
});

router.get('/', async (req, res) => {
    const conn = await pool.getConnection();

    const rows = await conn.query('SELECT * FROM junsware.memo');

    res.send(rows);

    conn.release();
});

router.post('/', async (req, res) => {
    const conn = await pool.getConnection();
    
    const add = await conn.query(
        "INSERT INTO junsware.memo (title, body)"
        + " value (?, ?)", 
        [req.body.title, req.body.form]);
    
    res.send("success");

    conn.release();
});

router.get('/create', (req, res) => {
    res.render(__dirname + '/ejs/create-memo');
});

router.get('/:id', async (req, res) => {
    const conn = await pool.getConnection();

    var id = req.params.id;

    const data = await conn.query(
        'SELECT seq, title, body FROM junsware.memo WHERE seq = ?'
    , [id]);
    
    res.render(__dirname + '/ejs/memo', data[0]);

    conn.release();
});

router.delete('/:id', async (req, res) => {
    const conn = await pool.getConnection();

    var id = req.params.id;

    const data = await conn.query(
        'DELETE FROM junsware.memo WHERE seq = ?', [id]
    );

    res.send('success');

    conn.release();
});

module.exports = router;