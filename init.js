const express = require('express');
const ejs = require('ejs');

const memoRouter = require('./memo/memo.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/memo', memoRouter);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render(__dirname + '/memo/ejs' + '/memo_list.ejs');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'port is running...');
});