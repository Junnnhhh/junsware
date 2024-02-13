const express = require('express');
const path = require('path');

const loginRouter = require('./module/user/login.js');
const memoRouter = require('./module/memo/memo.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(function(req, res, next) {
    const originUrl = req.originalUrl;

    if(originUrl == '/login') {
        next();
    } else {
        res.redirect("/login");
    }
});

app.use('/login', loginRouter);
app.use('/memo', memoRouter);



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'port is running...');
});