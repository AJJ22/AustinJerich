# Running Tests

## Frontend Tests (React)

Run the frontend test suite from the `frontend/` directory:

```bash
npm test
```

This will run all tests matching `**/*.test.js` or `**/*.test.jsx` patterns using Jest. Tests are configured to run once and exit (no watch mode by default).

**Test files location:** `src/components/__tests__/`, `src/components/movie_page/__tests__/`, etc.

### Example test files:

- `src/components/__tests__/Dropdown.test.js` – tests the Dropdown component
- `src/components/movie_page/__tests__/AddMovieForm.test.js` – tests the AddMovieForm component

## Backend Tests (Node.js)

Run the backend test suite from the `movie-API/` directory:

```bash
npm test
```

This will run all files matching `test/**/*.mjs` using Node's built-in test runner. Tests automatically skip the server startup and use a mocked Neon connection.

**Test files location:** `test/`

### Example test files:

- `test/movies.test.mjs` – tests the `/movies` endpoint

## Writing New Tests

### Frontend (React):

```javascript
import { render, screen, fireEvent } from "@testing-library/react";
import MyComponent from "../MyComponent";

test("MyComponent renders correctly", () => {
  render(<MyComponent />);
  expect(screen.getByText(/expected text/i)).toBeInTheDocument();
});
```

### Backend (Node.js):

```javascript
import request from "supertest";
import app from "../index.mjs";
import assert from "node:assert";

test("GET /movies returns 200", async () => {
  const res = await request(app).get("/movies");
  assert.equal(res.status, 200);
});
```

## Notes

- **Frontend:** Uses Jest (bundled with `react-scripts`) and React Testing Library
- **Backend:** Uses Node's built-in `test` module + `supertest` for HTTP testing
- **DB isolation:** Backend tests use a mock in-memory DB to avoid connecting to Neon
- Set `NODE_ENV=test` when running backend tests to automatically use mock DB
