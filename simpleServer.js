'use strict'

var express = require('express');
var app = express();

var interval = setInterval( () => {
	var newDate = new Date();
	console.log('Let\'s just print out the date: ' + newDate.toString('MM/dd/YYYY'));
}, 10000);

app.get('/', function (req, res) {
  res.send('Change Text to w');
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
})


