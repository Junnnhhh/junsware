const express = require('express');
const path = require('path');

const root = path.resolve(__dirname, '../..');

const router = express.Router();

router.get('/', (req, res) => {
    res.render(root + '/views/user/login');
});

router.post('/', (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;

    if(email == 'junhuyk96@gmail.com' && pw == '1') {
        res.cookie('login', email, {});
    }
    
    res.send("success");
});

module.exports = router;