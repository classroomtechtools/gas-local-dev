// Only do this if called directly:
if (require.main === module) {
	let server = require('./server.js');
	server.create(8888);
}