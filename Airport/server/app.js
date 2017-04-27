'use strict'
/*
    Basic server to handle the application
*/

//Required Modules
const express = require('express');
const app = express();
const path = require('path');
const utils = require('./utils');
const favicon = require('serve-favicon');

//Static Middleware
var root = path.join(__dirname, '../');

var browserPath = path.join(root, './browser');

app.use(express.static(browserPath));
app.use(favicon(__dirname + '/views/favicon.ico'));

//Routes

app.use('/api', require('./routes')());

/*
    Default browser landing page - All get requests will serve the main page
*/
app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../server/views/index.html'));
})

//Error Handler Middleware
app.use(function (err, req, res, next) {
    console.log('Application hit an error');
    res.sendStatus(404);
})

//Application Server
app.listen(3456, function () {
    console.log('You are now live at 3456');
});