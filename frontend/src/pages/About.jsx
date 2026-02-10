import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "./About.css";

export default function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        {/* HERO */}
        <section className="about-hero">
          <div className="about-hero-glass">
            <p className="about-kicker">About</p>
            <h1>Controller of Examinations</h1>
            <p className="about-hero-subtitle">
              Driving academic excellence through transparent, fair, and
              innovative examination systems.
            </p>
          </div>
        </section>

        {/* ROLE SECTION */}
        <section className="about-section">
          <h2>Role of Controller of Examinations</h2>
          <p>
            The Controller of Examinations (CoE) is the chief administrative
            authority responsible for the planning, organization, conduct, and
            management of all examinations in the University. The CoE ensures
            that examinations are conducted with utmost integrity,
            transparency, and in strict adherence to University regulations and
            statutory guidelines.
          </p>
          <p>
            The office oversees the entire examination lifecycle - from
            timetable preparation, question paper setting, hall ticket
            generation, conduct of examinations, evaluation, moderation, result
            processing, to the issue of final transcripts and certificates.
          </p>

          <div className="about-role-grid">
            <div className="about-role-card">
              <h3>Examination Conduct</h3>
              <p>Planning and execution of fair examinations.</p>
            </div>
            <div className="about-role-card">
              <h3>Quality Assurance</h3>
              <p>Ensuring evaluation standards and moderation.</p>
            </div>
            <div className="about-role-card">
              <h3>Result Processing</h3>
              <p>Timely publication of accurate results.</p>
            </div>
            <div className="about-role-card">
              <h3>Grievance Redressal</h3>
              <p>Handling revaluation and student queries.</p>
            </div>
          </div>
        </section>

        {/* MESSAGE */}
        <section className="about-section">
          <h2>Message from Controller of Examinations</h2>

          <div className="about-message-glass">
            <p className="about-message-body">
              Dear Students, Faculty, and Stakeholders,
            </p>
            <p className="about-message-body">
              It is my privilege to serve as the Controller of Examinations for
              this esteemed institution. Our examination system is built on the
              foundational pillars of integrity, transparency, and fairness. We
              are committed to maintaining the highest standards of academic
              rigor while ensuring a student-centric approach.
            </p>
            <p className="about-message-body">
              In alignment with NAAC guidelines and the CBCS-OBE framework, we
              continuously innovate our processes to provide a robust,
              efficient, and technologically advanced examination ecosystem. We
              believe in timely communication, prompt grievance redressal, and
              continuous improvement through stakeholder feedback.
            </p>
            <p className="about-message-body">
              I encourage all students to actively engage with our digital
              platforms and reach out to our helpdesk for any
              examination-related support.
            </p>
            <p className="about-message-signoff">
              Best wishes for your academic journey.
            </p>
            <p className="about-message-signature">
              — Dr. [Name]
              <br />
              Controller of Examinations
            </p>
          </div>
        </section>

        {/* REFORMS TIMELINE */}
        <section className="about-section">
          <h2>Examination Reforms Timeline</h2>

          <div className="about-timeline">
            <div className="about-timeline-item">
              <div className="about-timeline-year">2024</div>
              <div className="about-timeline-content">
                <h3>AI-Powered Evaluation System</h3>
                <p>
                  Implemented automated answer sheet scanning with AI
                  assistance for objective evaluation.
                </p>
              </div>
            </div>

            <div className="about-timeline-item">
              <div className="about-timeline-year">2023</div>
              <div className="about-timeline-content">
                <h3>Online Examination Portal</h3>
                <p>
                  Launched comprehensive digital platform for examination
                  registration and result publication.
                </p>
              </div>
            </div>

            <div className="about-timeline-item">
              <div className="about-timeline-year">2022</div>
              <div className="about-timeline-content">
                <h3>CBCS Implementation</h3>
                <p>
                  Successfully transitioned to Choice-Based Credit System across
                  all programs.
                </p>
              </div>
            </div>

            <div className="about-timeline-item">
              <div className="about-timeline-year">2021</div>
              <div className="about-timeline-content">
                <h3>OBE Framework Adoption</h3>
                <p>
                  Integrated Outcome-Based Education principles in examination
                  and evaluation.
                </p>
              </div>
            </div>

            <div className="about-timeline-item">
              <div className="about-timeline-year">2020</div>
              <div className="about-timeline-content">
                <h3>Digital Transformation</h3>
                <p>
                  Initiated complete digitalization of examination processes and
                  record management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="about-section about-two-column">
          <div>
            <h2>Vision</h2>
            <p>
              To be a benchmark of excellence in examination management,
              fostering academic integrity and innovation while empowering
              students through transparent and efficient processes.
            </p>
          </div>

          <div>
            <h2>Mission</h2>
            <ul className="about-mission-list">
              <li>Conduct fair and transparent examinations.</li>
              <li>Ensure timely result processing and publication.</li>
              <li>Maintain NAAC and statutory compliance.</li>
              <li>Implement innovative evaluation methods.</li>
              <li>Provide responsive student support services.</li>
            </ul>
          </div>
        </section>

        {/* KEY STATISTICS */}
        <section className="about-section">
          <h2>Key Statistics (2025-26)</h2>

          <div className="about-stats-grid">
            <div className="about-stat-card">
              <span className="about-stat-label">Students Examined</span>
              <span className="about-stat-value">15,234</span>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-label">Exams Conducted</span>
              <span className="about-stat-value">162</span>
            </div>
            <div className="about-stat-card">
              <span className="about-stat-label">Results Published</span>
              <span className="about-stat-value">On time</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

