var createError = require('http-errors');
var express = require('express');
var app = require('http');
var path = require('path');
var db = require('./db')
var ejs = require('ejs');
var indexRouter = require('./router/user');
var degreeRouter = require('./router/degree');
var app = express();
const port = process.env.port || 5000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/router/user', indexRouter);
app.use('/router/degree', degreeRouter);


//if we are here then the specified request is not found
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});
app.listen(port);
console.log('port number', port);

module.exports = app;
