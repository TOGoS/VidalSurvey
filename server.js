var connect = require('connect');
var serveStatic = require('serve-static');
var port = 5000;

function handler() {
	console.log('Server running on port ' + port + '...');
}

connect().use(serveStatic('./app')).listen(port, handler);