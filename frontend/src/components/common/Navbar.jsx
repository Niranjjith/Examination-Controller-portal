import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Add subtle elevation + background once the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-inner">
        <div className="nav-left">
          <span className="logo">🎓</span>
          <span className="title">Controller of Examinations</span>
        </div>

        <div className="nav-right">
          <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Student Services</NavLink>
            <NavLink to="/notifications">Notifications</NavLink>
          </div>

          <div className="nav-actions">
            <NavLink to="/login" className="nav-login-btn">
              Login
            </NavLink>
            <NavLink
              to="/admin"
              className="nav-avatar"
              aria-label="Admin dashboard"
            >
              <span>AD</span>
            </NavLink>
          </div>

          <button
            type="button"
            className={`nav-toggle ${isMenuOpen ? "open" : ""}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
