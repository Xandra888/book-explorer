// Presentational card. Receives a single `book` object and an `onSelect`
// callback as props from BookList (which received them from App).
export default function BookCard({ book, onSelect }) {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;
  const author = book.author_name ? book.author_name.join(", ") : "Unknown author";

  return (
    <div
      className="book-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(book)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(book)}
    >
      <div className="book-card-cover">
        {cover ? (
          <img src={cover} alt={`Cover of ${book.title}`} loading="lazy" />
        ) : (
          <span className="book-card-placeholder">📕</span>
        )}
      </div>
      <div className="book-card-body">
        <h3>{book.title}</h3>
        <p className="book-card-author">{author}</p>
        <p className="book-card-year">{book.first_publish_year || "Year unknown"}</p>
      </div>
    </div>
  );
}
