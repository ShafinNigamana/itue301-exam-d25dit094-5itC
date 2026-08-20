// BooksPage — Task 1, 4
// Fetches books from Express API and renders BookCard components
// Demonstrates: useEffect, useState (data/loading/error), fetch, conditional rendering

import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import BookCard from "../components/BookCard";

function BooksPage() {
  // Three states as required by Task 4
  const [data, setData] = useState([]);       // Book data from API
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null);     // Error message

  // useEffect runs when the component mounts (empty dependency array [])
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        // Fetch books from Express API (Task 3 endpoint)
        const response = await fetch("http://localhost:5000/api/v1/books");

        // Check if the response is ok
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const result = await response.json();

        // Set the book data from API response
        setData(result.data);
      } catch (err) {
        // Set error message if request fails
        setError(err.message);
      } finally {
        // Stop loading regardless of success or failure
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty array = run only once on mount

  // --- CONDITIONAL RENDERING ---

  // 1. Loading state
  if (loading) {
    return (
      <div className="page">
        <div className="loading-container fade-in">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading books...</p>
        </div>
      </div>
    );
  }

  // 2. Error state
  if (error) {
    return (
      <div className="page">
        <div className="error-card fade-in">
          <p className="error-title">Something went wrong</p>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  // 3. Success state — render books from API data
  return (
    <div className="page">
      <div className="page-header fade-in">
        <span className="page-eyebrow">
          <BookOpen size={14} />
          Collection
        </span>
        <h1 className="page-title">Library Books</h1>
        <p className="page-subtitle">
          Browse all available books in the CHARUSAT college library.
        </p>
      </div>

      {/* Render BookCard for each book from API response */}
      <div className="books-grid">
        {data.map((book, index) => (
          <div key={book.id} className={`fade-in fade-in-delay-${(index % 3) + 1}`}>
            <BookCard
              title={book.title}
              author={book.author}
              category={book.category}
              available={book.available}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;
