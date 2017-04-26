const pmx = require('pmx');
const probe = pmx.probe();


//pmx action - commands from the CLI
pmx.action('checkHealth', (reply) => {
	reply( 'Good' );
});

pmx.action('getUsers', (reply) => {
	reply( 'Number of users is : ' + Object.keys(users).length);
});


//Setting up metrics for pm2 monit
let users = {};

var metric = probe.metric({
  name    : 'Realtime user',
  value   : function() {
		console.log('Number of users', Object.keys(users).length);
    return Object.keys(users).length;
  }
});

var userTimeout = setInterval( () => {
	users[Object.keys(users).length] = 'New User';
}, 5000);


// Histogram Example
var histogram = probe.histogram({
  name        : 'errorPixels',
  measurement : 'mean'
});

var errorPixels = 0;

setInterval(function() {
  errorPixels = Math.round(Math.random() * 100);
  histogram.update(errorPixels);
}, 100);
