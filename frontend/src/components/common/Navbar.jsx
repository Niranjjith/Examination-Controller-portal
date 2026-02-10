import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">🎓</span>
        <span className="title">Controller of Examinations</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Student Services</Link>
        <Link to="/notifications">Notifications</Link>
      </div>
    </nav>
  );
}
