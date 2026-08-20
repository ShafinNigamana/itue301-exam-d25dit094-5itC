// BookCard Component — Task 1
// Accepts props: title, author, category, available
// Displays all four values with visual status indicator

function BookCard({ title, author, category, available }) {
  return (
    <div className="book-card">
      {/* Category badge */}
      <span className="book-card-category">{category}</span>

      {/* Book title */}
      <h3 className="book-card-title">{title}</h3>

      {/* Author with decorative dash */}
      <p className="book-card-author">{author}</p>

      {/* Availability status — different visual based on available prop */}
      <span className={`book-card-status ${available ? "available" : "unavailable"}`}>
        <span className="book-card-status-dot"></span>
        {available ? "Available" : "Not Available"}
      </span>
    </div>
  );
}

export default BookCard;
