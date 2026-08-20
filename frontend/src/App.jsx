// App.jsx — Task 2
// Configures React Router with routes for all three pages

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BorrowPage from "./pages/BorrowPage";

function App() {
  return (
    // BrowserRouter enables client-side routing without full-page reloads
    <BrowserRouter>
      {/* Navbar is outside Routes so it shows on every page */}
      <Navbar />

      {/* Route definitions */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/borrow" element={<BorrowPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
