const express = require('express');
const path = require('path');

const router = express.Router();

const root = path.resolve(__dirname, '../..');

router.get('/', (req, res) => {
    res.render(root + '/views/home/main', {});
});

module.exports = router;