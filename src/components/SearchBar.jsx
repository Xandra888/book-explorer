// Controlled search input. Its value is driven entirely by the `query`
// prop/state owned in App, so React state is the single source of truth.
export default function SearchBar({ query, onQueryChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search by title or author…"
        aria-label="Search books"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}
