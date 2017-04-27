const pmx = require('pmx');
const probe = pmx.probe();

let health = 'Good'
//pmx action - commands from the CLI
pmx.action('checkHealth', (reply) => {
	reply( `Health is ${health}` );
});

pmx.action('getPixelsSent', (reply) => {
	reply( 'Number of pixels sent is : ' + Object.keys(pixels).length);
});

pmx.action('setHealth', (param, reply) => {
	console.log( `Setting health is ${param}`);
	health = param;
	reply( `Health is ${health}` );
});


//Setting up metrics for pm2 monit
let pixels = {};

var metric = probe.metric({
  name    : 'Number of Pixels Sent',
  value   : function() {
    return Object.keys(pixels).length;
  },
});

var pixelTimeout = setInterval( () => {
	pixels[Object.keys(pixels).length] = {
		e: '24',
		k: 'Cannot call function destroy of null'
	};
}, 1000);


// Histogram Example
var histogram = probe.histogram({
  name        : 'Average errors per second',
  measurement : 'mean'
});

var errors = 0;

setInterval(function() {
  errors = Math.round(Math.random() * 100);
  histogram.update(errors);
}, 1000);


if (!cpu_usage) {
	var cpu_usage = 0;
}

// Probe Metric
var metric = probe.metric({
  name  : 'CPU usage',
  value : function() {
    return cpu_usage;
  },
  alert : {
    mode  : 'threshold',
    value : 95,
    msg   : 'Detected over 95% CPU usage', // optional
    func  : function() { //optional
      console.error('Detected over 95% CPU usage');
    },
    cmp   : "<" // optional
  }
});
