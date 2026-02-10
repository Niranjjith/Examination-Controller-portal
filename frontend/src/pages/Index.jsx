import Navbar from "../components/common/Navbar";
import "./Home.css";
import ServicesSection from "../components/common/ServicesSection";
import CommitmentSection from "../components/common/CommitmentSection";
import Footer from "../components/common/Footer";

export default function Index() {
  return (
    <>
      <Navbar />

      {/* FULL SCREEN HOME (NO SCROLL) */}
      <div className="home">
        {/* HERO */}
        <section className="hero">
          <h1>Controller of Examinations</h1>
          <p>Transparency, Integrity & Academic Excellence</p>

          <div className="hero-buttons">
            <button className="btn-primary">🎓 Student Services</button>
            <button className="btn-outline">ℹ️ About CoE</button>
          </div>
        </section>

        {/* QUICK ACCESS */}
        <section className="quick-access">
          <div className="quick-access-header">
            <div>
              <h2 className="quick-access-title">Student Quick Access</h2>
              <p className="quick-access-subtitle">
                Quickly reach important examination services and updates.
              </p>
            </div>
          </div>

          <div className="cards">
            <div className="card">
              <div className="card-icon">📅</div>
              <div className="card-label">Exam Timetable</div>
            </div>

            <div className="card">
              <div className="card-icon">🎫</div>
              <div className="card-label">Hall Ticket</div>
            </div>

            <div className="card">
              <div className="card-icon">🏆</div>
              <div className="card-label">Results</div>
            </div>

            <div className="card">
              <div className="card-icon">🔄</div>
              <div className="card-label">Revaluation Status</div>
            </div>
          </div>
        </section>
      </div>

      {/* SCROLLING STARTS HERE */}
      <ServicesSection />
      <CommitmentSection />
      <Footer />

    </>
  );
}
