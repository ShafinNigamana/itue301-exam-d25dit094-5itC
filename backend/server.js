// ============================================
// server.js — Express Backend for Library System
// ============================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = 5000;

// ============================================
// MIDDLEWARE
// ============================================

// Parse JSON request bodies
app.use(express.json());

// Enable CORS so React frontend can call this API
app.use(cors());

// Custom Request Logger Middleware (Task 3)
// Logs: [METHOD] [PATH] [TIMESTAMP] for every request
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.path} [${timestamp}]`);
  next(); // Pass control to the next middleware
};

// Apply logger globally
app.use(requestLogger);

// ============================================
// IN-MEMORY DATA (Task 3 — no MongoDB needed)
// ============================================

// Sample books array
const books = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    isbn: "978-0262033848",
    available: true,
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    isbn: "978-0132350884",
    available: false,
  },
  {
    id: 3,
    title: "Design Patterns",
    author: "Erich Gamma",
    category: "Software Engineering",
    isbn: "978-0201633610",
    available: true,
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    category: "Software Engineering",
    isbn: "978-0135957059",
    available: true,
  },
  {
    id: 5,
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    category: "Database",
    isbn: "978-0078022159",
    available: false,
  },
  {
    id: 6,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    category: "Networking",
    isbn: "978-0132126953",
    available: true,
  },
];

// In-memory borrowings array
const borrowings = [
  {
    id: 1,
    memberName: "Rahul Sharma",
    bookTitle: "Clean Code",
    borrowDate: "2026-08-01",
    returnDate: "2026-08-15",
    status: "borrowed",
  },
];

// ============================================
// REST API ENDPOINTS (Task 3)
// ============================================

// GET /api/v1/books — Return all books
app.get("/api/v1/books", (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

// GET /api/v1/borrowings — Return all borrowing records
app.get("/api/v1/borrowings", (req, res) => {
  res.status(200).json({
    success: true,
    count: borrowings.length,
    data: borrowings,
  });
});

// POST /api/v1/borrowings — Create a new borrowing record
app.post("/api/v1/borrowings", (req, res) => {
  const { memberName, bookTitle, borrowDate, returnDate } = req.body;

  // Basic validation
  if (!memberName || !bookTitle || !borrowDate || !returnDate) {
    return res.status(400).json({
      success: false,
      message: "All fields are required: memberName, bookTitle, borrowDate, returnDate",
    });
  }

  const newBorrowing = {
    id: borrowings.length + 1,
    memberName,
    bookTitle,
    borrowDate,
    returnDate,
    status: "borrowed",
  };

  borrowings.push(newBorrowing);

  res.status(201).json({
    success: true,
    message: "Borrowing record created successfully",
    data: newBorrowing,
  });
});

// ============================================
// MONGODB + MONGOOSE (Task 5)
// ============================================

// Import Mongoose models
const Book = require("./models/Book");
const Member = require("./models/Member");
const Borrowing = require("./models/Borrowing");

// Connect to MongoDB using connection string from .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

// --- MongoDB Routes ---

// POST /api/v1/mongo/books — Create a book in MongoDB
app.post("/api/v1/mongo/books", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// GET /api/v1/mongo/books — Get all books from MongoDB
app.get("/api/v1/mongo/books", async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/mongo/members — Create a member
app.post("/api/v1/mongo/members", async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/mongo/borrowings — Create a borrowing with references
app.post("/api/v1/mongo/borrowings", async (req, res, next) => {
  try {
    const borrowing = await Borrowing.create(req.body);
    res.status(201).json({ success: true, data: borrowing });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/mongo/borrowings — Get all borrowings (populated)
app.get("/api/v1/mongo/borrowings", async (req, res, next) => {
  try {
    const borrowings = await Borrowing.find()
      .populate("memberId", "name email")
      .populate("bookId", "title author");
    res.status(200).json({ success: true, count: borrowings.length, data: borrowings });
  } catch (err) {
    next(err);
  }
});

// ============================================
// GLOBAL ERROR-HANDLING MIDDLEWARE (Task 3)
// Must be the LAST middleware — has 4 parameters
// ============================================

app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: messages,
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `Duplicate value for field: ${field}`,
    });
  }

  // Generic server error
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
