// Navbar Component — Task 2
// Uses React Router <Link> for client-side navigation (no full-page reload)

import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, Library, HandCoins } from "lucide-react";

function Navbar() {
  // useLocation gives us the current URL path
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand section: CHARUSAT logo + divider + app name */}
        <div className="navbar-brand">
          <img
            src="/charusat-logo.webp"
            alt="CHARUSAT Logo"
            className="navbar-charusat-logo"
          />
          <span className="navbar-divider"></span>
          <div className="navbar-app-name">
            <Library size={16} />
            <span>LibraryMS</span>
          </div>
        </div>

        {/* Navigation Links using React Router Link */}
        <ul className="navbar-links">
          <li>
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              <Home size={15} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className={`nav-link ${location.pathname === "/books" ? "active" : ""}`}
            >
              <BookOpen size={15} />
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/borrow"
              className={`nav-link ${location.pathname === "/borrow" ? "active" : ""}`}
            >
              <HandCoins size={15} />
              Borrow
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
