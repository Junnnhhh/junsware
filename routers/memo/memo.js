const pool = require('../../config/db_connection.js');

const path = require('path');
const express = require('express');
const router = express.Router();

const root = path.resolve(__dirname, '../..');

router.get('/list', async (req, res) => {
    const conn = await pool.getConnection();

    const rows = await conn.query('SELECT * FROM junsware.memo');

    res.render(root + '/views/memo/list', {rows});
});

router.get('/create', (req, res) => {
    res.render(root + '/views/memo/create');
});

router.post('/create', async (req, res) => {
    const conn = await pool.getConnection();
    
    const add = await conn.query(
        "INSERT INTO junsware.memo (title, body, registdate, register)"
        + " value (?, ?, now(), 'junhuyk')", 
        [req.body.title, req.body.body]);
    
    res.send("success");

    conn.release();
});

router.post('/update', (req, res) => {
    res.render(root + '/views/memo/update', req.body);
});

router.get('/:id', async (req, res) => {
    const conn = await pool.getConnection();

    var id = req.params.id;

    const data = await conn.query(
        'SELECT seq, title, body FROM junsware.memo WHERE seq = ?'
    , [id]);

    res.render(root + '/views/memo/content', data[0]);

    conn.release();
});

router.put('/:id', async (req, res) => {
    const conn = await pool.getConnection();

    var id = req.params.id;
    var title = req.body.title;
    var body = req.body.body;

    const data = await conn.query(
        "UPDATE junsware.memo SET title = ?, body = ? WHERE seq = ?", [title, body, id]
    );

    res.send("success");

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