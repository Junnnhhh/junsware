const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.render(path.resolve(__dirname, '../../view/user/login'));
});

router.post('/', (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;

    console.log(email);
    console.log(pw);

    if(email == 'junhuyk96@gmail.com' && pw == '1') {
        res.cookie('login', email, {});
    }
    
    res.send("success");
});

module.exports = router;