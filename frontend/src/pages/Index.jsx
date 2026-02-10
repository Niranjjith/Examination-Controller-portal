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
          <h2>Student Quick Access</h2>

          <div className="cards">
            <div className="card">
              <span className="icon">📅</span>
              <span>Exam Timetable</span>
            </div>

            <div className="card">
              <span className="icon">🎫</span>
              <span>Hall Ticket</span>
            </div>

            <div className="card">
              <span className="icon">🏆</span>
              <span>Results</span>
            </div>

            <div className="card">
              <span className="icon">🔄</span>
              <span>Revaluation Status</span>
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
