const knex = require('knex');
const path = require('path');

// Initialize a SQLite database stored in a file for simplicity
const databaseFilePath = path.join(__dirname, '..', 'recipes.sqlite3');

const db = knex({
	client: 'sqlite3',
	connection: {
		filename: databaseFilePath,
	},
	useNullAsDefault: true,
});

async function ensureSchema() {
	const exists = await db.schema.hasTable('recipes');
	if (!exists) {
		await db.schema.createTable('recipes', table => {
			table.increments('id').primary();
			table.string('cuisine', 100);
			table.string('title', 255);
			table.float('rating');
			table.integer('prep_time');
			table.integer('cook_time');
			table.integer('total_time');
			table.text('description');
			// Store nutrients JSON as TEXT; use SQLite JSON1 for querying when needed
			table.text('nutrients');
			table.string('serves', 50);
			// Basic indexes for common filters
			table.index(['rating', 'total_time']);
			table.index(['cuisine']);
		});
	}
}

module.exports = {
	db,
	ensureSchema,
};

