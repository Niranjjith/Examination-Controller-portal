import "./CommitmentSection.css";

export default function CommitmentSection() {
  return (
    <section className="commitment-wrapper">
      {/* OUR COMMITMENT */}
      <div className="commitment-section">
        <h2>Our Commitment</h2>

        <div className="commitment-cards">
          <div className="commitment-card">
            <div className="commitment-icon blue">✔</div>
            <h3>NAAC Compliant</h3>
            <p>
              Fully aligned with NAAC guidelines ensuring quality assurance
              and accreditation standards.
            </p>
          </div>

          <div className="commitment-card">
            <div className="commitment-icon orange">✔</div>
            <h3>CBCS &amp; OBE Framework</h3>
            <p>
              Choice-Based Credit System with Outcome-Based Education
              for holistic and outcome-driven learning.
            </p>
          </div>

          <div className="commitment-card">
            <div className="commitment-icon blue">✔</div>
            <h3>Digital Transparency</h3>
            <p>
              Complete transparency in examination processes, results,
              evaluation, and academic governance.
            </p>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="stat">
          <h4>15,000+</h4>
          <span>Students Enrolled</span>
        </div>

        <div className="stat highlight">
          <h4>98%</h4>
          <span>Pass Rate</span>
        </div>

        <div className="stat">
          <h4>50+</h4>
          <span>Academic Programs</span>
        </div>

        <div className="stat highlight">
          <h4>A+</h4>
          <span>NAAC Grade</span>
        </div>
      </div>
    </section>
  );
}
