import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact Information</h3>

          <p>
            📍 <strong>Controller of Examinations</strong><br />
            University Campus<br />
            City, State - 000000
          </p>

          <p>📞 +91-123-456-7890</p>
          <p>✉️ coe@university.ac.in</p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>📄 Student Services</li>
            <li>🔔 Notifications</li>
            <li>🏅 Rank Holders</li>
          </ul>
        </div>

        {/* HELP DESK */}
        <div className="footer-section">
          <h3>Student Helpdesk</h3>

          <p>For examination-related queries:</p>

          <div className="helpdesk-box">
            <strong>Helpdesk Hours:</strong>
            <p>
              Mon - Fri: 9:00 AM - 5:00 PM<br />
              Sat: 9:00 AM - 1:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="footer-divider" />

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Controller of Examinations. All rights reserved.</p>
        <p>Committed to NAAC, CBCS &amp; OBE Compliance</p>
      </div>
    </footer>
  );
}
