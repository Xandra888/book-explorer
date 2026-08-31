import BookCard from "./BookCard.jsx";

// Maps the `books` array (prop from App) into individual BookCard
// components, forwarding the `onSelect` callback down to each one.
export default function BookList({ books, onSelect }) {
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onSelect={onSelect} />
      ))}
    </div>
  );
}
