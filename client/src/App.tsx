import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './style.css';

const Dashboard: React.FC = () => (
  <div className="page">
    <h1>Examinations Dashboard</h1>
    <p className="page-subtitle">Quick overview of upcoming and ongoing examinations.</p>
    <div className="grid">
      <div className="card metric">
        <h2>Upcoming Exams</h2>
        <p className="metric-value">12</p>
      </div>
      <div className="card metric">
        <h2>Ongoing Exams</h2>
        <p className="metric-value">3</p>
      </div>
      <div className="card metric">
        <h2>Completed Today</h2>
        <p className="metric-value">5</p>
      </div>
    </div>
  </div>
);

const ExamsPage: React.FC = () => {
  const [exams, setExams] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchExams = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('http://localhost:4000/api/exams');
      if (!res.ok) throw new Error('Failed to load exams');
      const data = await res.json();
      setExams(data);
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    void fetchExams();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Exams</h1>
          <p className="page-subtitle">Manage exam timetables, venues and statuses.</p>
        </div>
        <button className="primary-btn" type="button">
          + Create Exam
        </button>
      </div>
      {loading && <p>Loading exams…</p>}
      {error && <p className="error-text">{error}</p>}
      <div className="card table-card">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Programme</th>
              <th>Level</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam._id}>
                <td>{exam.code}</td>
                <td>{exam.title}</td>
                <td>{exam.programme}</td>
                <td>{exam.level}</td>
                <td>{exam.date ? new Date(exam.date).toLocaleDateString() : '-'}</td>
                <td>
                  {exam.startTime} - {exam.endTime}
                </td>
                <td>{exam.venue}</td>
                <td>
                  <span className={`status-pill status-${(exam.status || 'Scheduled').toLowerCase()}`}>
                    {exam.status}
                  </span>
                </td>
              </tr>
            ))}
            {!loading && !error && exams.length === 0 && (
              <tr>
                <td colSpan={8} className="empty-state">
                  No exams yet. Use &quot;Create Exam&quot; to add a new exam.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AcademicGovernancePage: React.FC = () => (
  <div className="page">
    <h1>Academic Governance</h1>
    <p className="page-subtitle">
      Configure examination policies, grading schemes and approval workflows as in your Figma design.
    </p>
    <div className="card">
      <p>
        This section is a placeholder for the detailed academic governance configuration UI from your Figma file. You can
        extend it with forms, tables and workflows as needed.
      </p>
    </div>
  </div>
);

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="shell">
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo-dot" />
        <span className="app-title">Examination Center</span>
      </div>
      <nav className="nav">
        <NavLink to="/" end className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/exams" className="nav-link">
          Exams
        </NavLink>
        <NavLink to="/academic-governance" className="nav-link">
          Academic Governance
        </NavLink>
      </nav>
    </aside>
    <main className="main">{children}</main>
  </div>
);

const App: React.FC = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="/academic-governance" element={<AcademicGovernancePage />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;

