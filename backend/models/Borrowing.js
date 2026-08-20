// Borrowing Schema — Task 5
const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member", // Reference to the Member model
    required: [true, "Member ID is required"],
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book", // Reference to the Book model
    required: [true, "Book ID is required"],
  },
  borrowDate: {
    type: Date,
    required: [true, "Borrow date is required"],
  },
  returnDate: {
    type: Date,
    required: [true, "Return date is required"],
  },
  status: {
    type: String,
    enum: {
      values: ["borrowed", "returned", "overdue"],
      message: "{VALUE} is not a valid status. Use: borrowed, returned, or overdue",
    },
    default: "borrowed",
  },
});

module.exports = mongoose.model("Borrowing", borrowingSchema);
