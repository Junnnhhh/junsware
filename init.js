const express = require('express');
const ejs = require('ejs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'port is running...');
});

module.exports = app;