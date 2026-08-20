// HomePage — Task 1 & 2
// Landing page with library overview and quick stats

import { Link } from "react-router-dom";
import { BookOpen, Users, ClipboardList, ArrowRight, GraduationCap } from "lucide-react";

function HomePage() {
  return (
    <div className="page">
      {/* Hero Section */}
      <div className="hero fade-in">
        <span className="page-eyebrow">
          <GraduationCap size={14} />
          CHARUSAT Library
        </span>

        <h1 className="hero-title">
          Library Book
          <br />
          <span className="hero-title-gradient">Management System</span>
        </h1>

        <p className="hero-description">
          A digital platform for CHARUSAT college library to manage books,
          members, and borrowing records efficiently.
        </p>

        <div className="hero-actions">
          <Link to="/books" className="btn btn-primary">
            Browse Books
            <ArrowRight size={16} />
          </Link>
          <Link to="/borrow" className="btn btn-secondary">
            Borrow a Book
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-grid fade-in fade-in-delay-2">
        <div className="stat-card">
          <div className="stat-icon books">
            <BookOpen size={24} color="#1B3A8C" />
          </div>
          <div className="stat-number">6</div>
          <div className="stat-label">Total Books</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon members">
            <Users size={24} color="#10B981" />
          </div>
          <div className="stat-number">150+</div>
          <div className="stat-label">Members</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon borrowed">
            <ClipboardList size={24} color="#E87722" />
          </div>
          <div className="stat-number">42</div>
          <div className="stat-label">Active Borrowings</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
