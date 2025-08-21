const fs = require('fs');
const path = require('path');
const { db, ensureSchema } = require('./db');

function normalizeNumber(value) {
	if (value === null || value === undefined) return null;
	if (Number.isNaN(value)) return null;
	const n = Number(value);
	return Number.isNaN(n) ? null : n;
}

async function seedFromJson(jsonFilePath) {
	await ensureSchema();
	const raw = fs.readFileSync(jsonFilePath, 'utf8');
	const data = JSON.parse(raw);
	const recipes = Array.isArray(data) ? data : Object.values(data);

	const rows = recipes.map(r => {
		const rating = normalizeNumber(r.rating);
		const prep_time = normalizeNumber(r.prep_time);
		const cook_time = normalizeNumber(r.cook_time);
		const total_time = normalizeNumber(r.total_time);
		const nutrients = r.nutrients ? JSON.stringify(r.nutrients) : null;
		return {
			cuisine: r.cuisine || null,
			title: r.title || null,
			rating,
			prep_time,
			cook_time,
			total_time,
			description: r.description || null,
			nutrients,
			serves: r.serves || null,
		};
	});

	// Clear and insert
	await db('recipes').del();
	// Chunked inserts for performance
	const chunkSize = 500;
	for (let i = 0; i < rows.length; i += chunkSize) {
		const chunk = rows.slice(i, i + chunkSize);
		await db('recipes').insert(chunk);
		process.stdout.write(`Inserted ${Math.min(i + chunkSize, rows.length)} / ${rows.length}\r`);
	}
	console.log(`\nSeed complete. Inserted ${rows.length} recipes.`);
}

if (require.main === module) {
	const jsonPathArg = process.argv[2] || path.join(__dirname, '..', 'US_recipes.json');
	if (!fs.existsSync(jsonPathArg)) {
		console.error(`JSON file not found at ${jsonPathArg}`);
		process.exit(1);
	}
	seedFromJson(jsonPathArg)
		.then(() => process.exit(0))
		.catch(err => {
			console.error(err);
			process.exit(1);
		});
}

module.exports = { seedFromJson };

