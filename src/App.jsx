import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import BookList from "./components/BookList.jsx";
import BookDetailModal from "./components/BookDetailModal.jsx";

export default function App() {
  // Controlled input value
  const [query, setQuery] = useState("dune");
  // The term actually submitted/searched for (separate from the live input)
  const [searchTerm, setSearchTerm] = useState("dune");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch results from Open Library whenever searchTerm changes.
  useEffect(() => {
    if (!searchTerm) return;
    let cancelled = false;

    setStatus("loading");
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setResults(data.docs || []);
        setStatus("success");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [searchTerm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) setSearchTerm(query.trim());
  }

  return (
    <div className="app">
      <header className="site-header">
        <span className="logo-icon">📖</span>
        <span className="logo-text">Book Explorer</span>
      </header>

      <section className="hero">
        <h1>Discover Your Next Read</h1>
        <p>Search millions of titles from the Open Library catalog.</p>
        <SearchBar query={query} onQueryChange={setQuery} onSubmit={handleSubmit} />
      </section>

      <main className="results">
        {status === "loading" && <p className="status-text">Searching the stacks…</p>}
        {status === "error" && (
          <p className="status-text status-error">Something went wrong. Please try again.</p>
        )}
        {status === "success" && results.length === 0 && (
          <p className="status-text">No books found.</p>
        )}
        {status === "success" && results.length > 0 && (
          <BookList books={results.slice(0, 24)} onSelect={setSelectedBook} />
        )}
      </main>

      {selectedBook && (
        <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

