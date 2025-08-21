## Recipes Backend (Spring Boot + MySQL)

This project parses a JSON file of recipes, stores it in MySQL, and exposes REST APIs for listing and searching. Includes OpenAPI UI.

### Requirements
- Java 17+
- Maven 3.9+
- MySQL 8+

### Setup
1. Create database:
```sql
CREATE DATABASE recipes_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
2. Configure credentials via environment variables or edit `src/main/resources/application.yml`:
```
DB_USERNAME=your_user
DB_PASSWORD=your_pass
```
3. Build and run:
```bash
mvn spring-boot:run
```

Flyway runs migration `V1__init_schema.sql` to create the `recipes` table.

### Import sample data
Set in `application.yml`:
```
app:
  data:
    init: true
```
Default file: `classpath:data/US_recipes.json`. On first run with empty table, it imports.

### API
- Swagger UI: `/swagger-ui/index.html`

1) GET `/api/recipes?page=1&limit=10`
Response:
```json
{ "page": 1, "limit": 10, "total": 2, "data": [ {"id":1, "title":"Classic Apple Pie", ...} ] }
```

2) GET `/api/recipes/search?calories=<=400&title=pie&rating=>=4.5`
Response:
```json
{ "data": [ {"id":1, "title":"Classic Apple Pie", ...} ] }
```

Supported search filters:
- calories: operators `<=`, `>=`, `<`, `>`, `=` or plain number
- title: partial match
- cuisine: exact match (case-insensitive)
- total_time: numeric with operators
- rating: numeric with operators

### Notes
- Numeric `NaN` values in JSON are converted to `null` during import.
- `nutrients` stored as JSON string and returned as-is.

### Run tests
```bash
mvn -q -DskipTests=false test
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
