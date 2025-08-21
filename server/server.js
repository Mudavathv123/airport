const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db, ensureSchema } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Health check
app.get('/api/health', (_req, res) => {
	res.json({ status: 'ok' });
});

// GET /api/recipes paginated and sorted by rating desc
app.get('/api/recipes', async (req, res) => {
	try {
		const page = parseInt(req.query.page, 10) || 1;
		const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
		const offset = (page - 1) * limit;

		const totalRow = await db('recipes').count({ count: '*' }).first();
		const total = totalRow ? Number(totalRow.count) : 0;

		const data = await db('recipes')
			.orderBy([{ column: 'rating', order: 'desc' }])
			.offset(offset)
			.limit(limit)
			.select('*');

		// Parse nutrients JSON text to object
		const parsed = data.map(r => ({ ...r, nutrients: r.nutrients ? JSON.parse(r.nutrients) : null }));
		res.json({ page, limit, total, data: parsed });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Helper to build operator filter like ">=4.5" or "<=120" or "=300"
function parseComparator(input) {
	if (!input || typeof input !== 'string') return null;
	const m = input.match(/^(<=|>=|=|<|>)(.+)$/);
	if (!m) return null;
	const operator = m[1];
	const value = Number(m[2]);
	if (Number.isNaN(value)) return null;
	return { operator, value };
}

// GET /api/recipes/search
app.get('/api/recipes/search', async (req, res) => {
	try {
		const { calories, title, cuisine, total_time, rating } = req.query;
		const query = db('recipes');

		if (title) {
			query.whereLike('title', `%${title}%`);
		}
		if (cuisine) {
			query.where('cuisine', cuisine);
		}
		if (rating) {
			const cmp = parseComparator(rating);
			if (!cmp) return res.status(400).json({ error: 'Invalid rating comparator' });
			query.andWhere('rating', cmp.operator, cmp.value);
		}
		if (total_time) {
			const cmp = parseComparator(total_time);
			if (!cmp) return res.status(400).json({ error: 'Invalid total_time comparator' });
			query.andWhere('total_time', cmp.operator, cmp.value);
		}
		if (calories) {
			const cmp = parseComparator(calories);
			if (!cmp) return res.status(400).json({ error: 'Invalid calories comparator' });
			// nutrients is stored as JSON text; use JSON1 to extract calories if available, else filter post-query
			// Try SQL-side first
			query.andWhereRaw("CAST(json_extract(nutrients, '$.calories') AS REAL) " + cmp.operator + ' ?', [cmp.value]);
		}

		const results = await query.orderBy([{ column: 'rating', order: 'desc' }]).select('*');
		const parsed = results.map(r => ({ ...r, nutrients: r.nutrients ? JSON.parse(r.nutrients) : null }));
		res.json({ data: parsed });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

async function start() {
	await ensureSchema();
	const port = process.env.PORT || 4000;
	app.listen(port, () => {
		console.log(`API server listening on http://localhost:${port}`);
	});
}

if (require.main === module) {
	start();
}

module.exports = { app, start };

