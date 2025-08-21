# Recipe Data Collection and API Development

Full-stack implementation using React (CRA), Express, and SQLite (via Knex).

## Project Structure

- `server/` Express API, database, and seed scripts
- `src/` React frontend (table, filters, drawer)

## Tech Stack

- Frontend: React, MUI, Tailwind (CDN), axios, react-rating-stars-component
- Backend: Node.js, Express, Knex, SQLite
- Database: SQLite (dev-friendly). Schema compatible with PostgreSQL

## Database Schema

Table `recipes`:

```
id INTEGER PRIMARY KEY AUTOINCREMENT
cuisine VARCHAR(100)
title VARCHAR(255)
rating FLOAT
prep_time INTEGER
cook_time INTEGER
total_time INTEGER
description TEXT
nutrients TEXT (JSON string)
serves VARCHAR(50)
```

## Setup

1) Install dependencies:

```
npm install
```

2) Seed database with your JSON file (place `US_recipes.json` in project root):

```
npm run seed
```

Or seed with sample data:

```
npm run seed:sample
```

3) Start app (client + server):

```
npm start
```

- Client: http://localhost:3000
- API: http://localhost:4000

## API Endpoints

- GET `/api/recipes?page=1&limit=10` — paginated, sorted by rating desc

Sample response:

```
{ "page": 1, "limit": 10, "total": 8450, "data": [ { ... } ] }
```

- GET `/api/recipes/search?calories=<=400&title=pie&rating=>=4.5&cuisine=Italian&total_time=<=120`

Sample response:

```
{ "data": [ { ... } ] }
```

Notes:

- Comparators supported for numeric filters: `<=`, `>=`, `=`, `<`, `>`
- Calories is read from `nutrients.calories` (JSON)

## Frontend

- Navigate to `/recipes` to open the Recipe table.
- Features:
  - Table columns: Title, Cuisine, Rating (stars), Total Time, Serves
  - Filters: title, cuisine, rating, total time, calories
  - Drawer with details and nutrients
  - Pagination and per-page selection
  - Empty-state messages when no data

## Testing with curl

```
curl "http://localhost:4000/api/recipes?page=1&limit=10"
curl "http://localhost:4000/api/recipes/search?calories=<=400&title=pie&rating=>=4.5"
```

## Implementation Notes

- NaN numeric fields are normalized to NULL during seeding
- `nutrients` stored as JSON string; SQL-side filter uses SQLite JSON1 `json_extract`