import { useEffect, useState } from "react";

// Shows expanded details for the currently selected book. Fetches the
// work record (subjects/genres) as soon as a new `book` prop arrives.
export default function BookDetailModal({ book, onClose }) {
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoadingDetails(true);
    setDetails(null);

    fetch(`https://openlibrary.org${book.key}.json`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setDetails(data);
          setLoadingDetails(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoadingDetails(false);
      });

    return () => {
      cancelled = true;
    };
  }, [book.key]);

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;
  const author = book.author_name ? book.author_name.join(", ") : "Unknown author";
  const subjects = (details?.subjects || []).slice(0, 12);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modal-content">
          <div className="modal-cover">
            {cover ? (
              <img src={cover} alt={`Cover of ${book.title}`} />
            ) : (
              <span className="book-card-placeholder">📕</span>
            )}
          </div>
          <div className="modal-info">
            <h2>{book.title}</h2>
            <p className="modal-author">{author}</p>
            <p className="modal-meta">
              First published {book.first_publish_year || "unknown"} ·{" "}
              {book.edition_count || 0} editions
            </p>

            {loadingDetails ? (
              <p className="modal-loading">Loading more details…</p>
            ) : subjects.length > 0 ? (
              <div className="tag-wrap">
                {subjects.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="modal-loading">No subject tags available for this title.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
