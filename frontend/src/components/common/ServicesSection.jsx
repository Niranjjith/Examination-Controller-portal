import "./ServicesSection.css";

export default function ServicesSection() {
  return (
    <section className="services-section">
      <h2>Examination Services & Resources</h2>

      <div className="services-grid">
        <div className="service-card">
          <div className="icon blue">👥</div>
          <h3>Student Services</h3>
          <p>Timetable, Hall Tickets, Results & More</p>
          <span className="link">Learn more →</span>
        </div>

        <div className="service-card">
          <div className="icon indigo">📘</div>
          <h3>Examination System</h3>
          <p>CBCS, Grading, CIA & ESE Guidelines</p>
          <span className="link">Learn more →</span>
        </div>

        <div className="service-card">
          <div className="icon purple">📄</div>
          <h3>Applications & Forms</h3>
          <p>Revaluation, Certificates & Requests</p>
          <span className="link">Learn more →</span>
        </div>

        <div className="service-card">
          <div className="icon orange">🔔</div>
          <h3>Notifications</h3>
          <p>Latest Updates & Important Notices</p>
          <span className="link">Learn more →</span>
        </div>

        <div className="service-card">
          <div className="icon green">🛡️</div>
          <h3>Academic Governance</h3>
          <p>Council, Board of Studies & Governing Body</p>
          <span className="link">Learn more →</span>
        </div>

        <div className="service-card">
          <div className="icon cyan">📊</div>
          <h3>Quality & Reports</h3>
          <p>Best Practices, Innovations & NAAC Reports</p>
          <span className="link">Learn more →</span>
        </div>
      </div>
    </section>
  );
}
