import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "./StudentServices.css";

export default function StudentServices() {
  return (
    <>
      <Navbar />

      <main className="services-page">
        {/* HERO */}
        <section className="services-hero">
          <div className="services-hero-glass">
            <p className="services-kicker">Student Services</p>
            <h1>Your one-stop portal</h1>
            <p className="services-hero-subtitle">
              Your one-stop portal for all examination-related services.
            </p>
          </div>
        </section>

        {/* SERVICE CARDS */}
        <section className="services-section">
          <div className="services-section-header">
            <h2>Select a Service</h2>
          </div>

          <div className="services-grid">
            <div className="service-tile">
              <div className="service-tile-header">
                <h3>Examination Timetable</h3>
                <p>View and download exam schedules.</p>
              </div>
              <button type="button" className="service-cta">
                Access Service →
              </button>
            </div>

            <div className="service-tile">
              <div className="service-tile-header">
                <h3>Hall Ticket / Admit Card</h3>
                <p>Download your examination hall ticket.</p>
              </div>
              <button type="button" className="service-cta">
                Access Service →
              </button>
            </div>

            <div className="service-tile">
              <div className="service-tile-header">
                <h3>Examination Results</h3>
                <p>Check and download your results.</p>
              </div>
              <button type="button" className="service-cta">
                Access Service →
              </button>
            </div>

            <div className="service-tile">
              <div className="service-tile-header">
                <h3>Revaluation Status</h3>
                <p>Track your revaluation application.</p>
              </div>
              <button type="button" className="service-cta">
                Access Service →
              </button>
            </div>
          </div>
        </section>

        {/* INSTRUCTIONS */}
        <section className="services-section">
          <div className="services-instructions">
            <h2>Important Instructions</h2>
            <ul>
              <li>
                Ensure you have a stable internet connection before downloading
                documents.
              </li>
              <li>Hall tickets will be available 7 days before the examination.</li>
              <li>
                Results are typically published within 30 days of examination
                completion.
              </li>
              <li>Keep your registration number and password secure.</li>
              <li>
                For any technical issues, contact the helpdesk immediately.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

