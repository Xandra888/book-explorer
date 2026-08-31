# Book Explorer

A simple React book search app built on the [Open Library Search API](https://openlibrary.org/dev/docs/api/search) — no API key required.

## Features

- Controlled search input (title or author)
- Fetches results from Open Library on submit
- Loading, error, empty ("No books found."), and results states
- Clicking a book card opens a detail view with subject/genre tags and edition count (fetched from the book's Open Library work record)

## React concepts demonstrated

- **State** — `query`, `searchTerm`, `results`, `status`, `selectedBook` in `App.jsx`
- **Props** — `App` → `SearchBar` / `BookList` → `BookCard`, and `App` → `BookDetailModal`
- **useEffect** — fetches search results when `searchTerm` changes, and fetches extra book details when the modal opens
- **Conditional rendering** — loading / error / empty / results states in `App.jsx`

## Project structure

```
src/
  App.jsx                    # owns state, orchestrates search
  index.css                  # theme styles
  components/
    SearchBar.jsx
    BookList.jsx
    BookCard.jsx
    BookDetailModal.jsx
```

## Run locally

```bash
npm install
npm run dev
```

## Deploy

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/book-explorer.git
git push -u origin main
```

(Create the empty `book-explorer` repository on GitHub first, without a README, so there's no merge conflict.)

### 2. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the `book-explorer` GitHub repo.
2. Vercel auto-detects Vite — leave the build command as `vite build` and output directory as `dist`.
3. Click **Deploy**. You'll get a live `*.vercel.app` domain.
