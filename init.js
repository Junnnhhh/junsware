const express = require('express');
const path = require('path');

const memoRouter = require('./module/memo/memo.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/memo', memoRouter);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/memo/list');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'port is running...');
});