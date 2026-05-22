const db = require('./db');

(async () => {
	try {
		await db.init();
		console.log('DB initialization complete.');
		process.exit(0);
	} catch (err) {
		console.error('DB init failed:', err);
		process.exit(1);
	}
})();
