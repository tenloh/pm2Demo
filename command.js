var pmx = require('pmx');
var probe = pmx.probe();


//pmx action - commands from the CLI
pmx.action('saySomething', (reply) => {
	reply( 'Hello' );
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
  name        : 'latency',
  measurement : 'mean'
});

var latency = 0;

setInterval(function() {
  latency = Math.round(Math.random() * 100);
  histogram.update(latency);
}, 100);
