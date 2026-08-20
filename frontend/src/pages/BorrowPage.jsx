// BorrowPage — Task 2
// Borrowing form with useState for controlled components
// Demonstrates: useState, controlled inputs (value + onChange), live preview

import { useState } from "react";
import { ClipboardList, CheckCircle } from "lucide-react";

function BorrowPage() {
  // useState for each form field — controlled components
  const [memberName, setMemberName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      // POST borrowing data to Express API
      const response = await fetch("http://localhost:5000/api/v1/borrowings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberName,
          bookTitle,
          borrowDate,
          returnDate,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setMemberName("");
          setBookTitle("");
          setBorrowDate("");
          setReturnDate("");
          setSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Error submitting:", err);
    }
  };

  // Check if any field has a value (for preview display)
  const hasPreviewData = memberName || bookTitle || borrowDate || returnDate;

  return (
    <div className="page">
      <div className="page-header fade-in">
        <span className="page-eyebrow">
          <ClipboardList size={14} />
          Borrow
        </span>
        <h1 className="page-title">Borrow a Book</h1>
        <p className="page-subtitle">
          Fill in the details below to create a new borrowing record.
        </p>
      </div>

      <div className="form-container fade-in fade-in-delay-1">
        {/* Left: Borrowing Form */}
        <div className="form-card">
          <h2 className="form-card-title">Borrowing Details</h2>

          <form onSubmit={handleSubmit}>
            {/* Member Name — controlled component with value and onChange */}
            <div className="form-group">
              <label className="form-label" htmlFor="memberName">
                Member Name
              </label>
              <input
                id="memberName"
                type="text"
                className="form-input"
                placeholder="Enter member name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
            </div>

            {/* Book Title — controlled component */}
            <div className="form-group">
              <label className="form-label" htmlFor="bookTitle">
                Book Title
              </label>
              <input
                id="bookTitle"
                type="text"
                className="form-input"
                placeholder="Enter book title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </div>

            {/* Borrow Date — controlled component */}
            <div className="form-group">
              <label className="form-label" htmlFor="borrowDate">
                Borrow Date
              </label>
              <input
                id="borrowDate"
                type="date"
                className="form-input"
                value={borrowDate}
                onChange={(e) => setBorrowDate(e.target.value)}
              />
            </div>

            {/* Return Date — controlled component */}
            <div className="form-group">
              <label className="form-label" htmlFor="returnDate">
                Return Date
              </label>
              <input
                id="returnDate"
                type="date"
                className="form-input"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <button type="submit" className="form-button">
              Submit Borrowing
            </button>

            {/* Success message */}
            {submitted && (
              <div className="success-toast">
                <CheckCircle size={16} style={{ display: "inline", verticalAlign: "middle", marginRight: "6px" }} />
                Borrowing record created successfully!
              </div>
            )}
          </form>
        </div>

        {/* Right: Live Preview — shows values as state changes */}
        <div className="preview-card">
          <h2 className="preview-title">
            <span className="preview-dot"></span>
            Live Preview
          </h2>

          {hasPreviewData ? (
            <>
              {/* Display each entered value in real-time */}
              <div className="preview-item">
                <div className="preview-item-label">Member Name</div>
                <div className="preview-item-value">
                  {memberName || "—"}
                </div>
              </div>

              <div className="preview-item">
                <div className="preview-item-label">Book Title</div>
                <div className="preview-item-value">
                  {bookTitle || "—"}
                </div>
              </div>

              <div className="preview-item">
                <div className="preview-item-label">Borrow Date</div>
                <div className="preview-item-value">
                  {borrowDate || "—"}
                </div>
              </div>

              <div className="preview-item">
                <div className="preview-item-label">Return Date</div>
                <div className="preview-item-value">
                  {returnDate || "—"}
                </div>
              </div>

              <div className="preview-item">
                <div className="preview-item-label">Status</div>
                <div className="preview-item-value">Borrowed</div>
              </div>
            </>
          ) : (
            <p className="preview-empty">
              Start typing to see a live preview of your borrowing details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BorrowPage;
