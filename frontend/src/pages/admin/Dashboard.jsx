import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import "./AdminDashboard.css";

const API_BASE = "http://localhost:5000";

export default function AdminDashboard() {
  const [timetableTitle, setTimetableTitle] = useState("");
  const [resultsTitle, setResultsTitle] = useState("");
  const [revaluationTitle, setRevaluationTitle] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resultFile, setResultFile] = useState(null);
  const [circularTitle, setCircularTitle] = useState("");
  const [circularMessage, setCircularMessage] = useState("");
  const [circularFile, setCircularFile] = useState(null);
  const [circulars, setCirculars] = useState([]);
  const [principals, setPrincipals] = useState([]);
  const [principalsLoading, setPrincipalsLoading] = useState(false);
  const [circularLoading, setCircularLoading] = useState(false);
  const [principalForm, setPrincipalForm] = useState({ name: "", email: "", password: "" });
  const [editingPrincipal, setEditingPrincipal] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [metrics] = useState({
    totalExams: 162,
    studentsExamined: 15234,
    pendingRevaluations: 24,
    lastUpdated: "Today, 10:15 AM",
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const loadCirculars = async () => {
    try {
      const res = await api.get("/circulars");
      setCirculars(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadPrincipals = async () => {
    setPrincipalsLoading(true);
    try {
      const res = await api.get("/principals");
      setPrincipals(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setPrincipalsLoading(false);
    }
  };

  useEffect(() => {
    loadCirculars();
  }, []);

  useEffect(() => {
    if (activeTab === "principals") loadPrincipals();
  }, [activeTab]);

  const handleTimetableSubmit = (e) => {
    e.preventDefault();
    console.log("Timetable saved:", { timetableTitle });
  };

  const handleResultsSubmit = (e) => {
    e.preventDefault();
    console.log("Results saved:", { resultsTitle });
  };

  const handleRevaluationSubmit = (e) => {
    e.preventDefault();
    console.log("Revaluation saved:", { revaluationTitle });
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    console.log("Account update:", { currentPassword, newEmail, newPassword });
  };

  const handleResultUpload = (e) => {
    e.preventDefault();
    if (!resultFile) return;
    console.log("Result file selected:", resultFile.name);
  };

  const handleCircularSubmit = async (e) => {
    e.preventDefault();
    if (!circularTitle.trim()) return;
    setCircularLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", circularTitle);
      formData.append("message", circularMessage);
      formData.append("sentTo", JSON.stringify(["PRINCIPAL", "FACULTY"]));
      if (circularFile) formData.append("file", circularFile);

      await api.post("/circulars", formData);
      setCircularTitle("");
      setCircularMessage("");
      setCircularFile(null);
      loadCirculars();
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send circular";
      if (err.response?.status === 403) {
        alert(`${msg}\n\nPlease log in as Admin (examcontroller@gmail.com) to send circulars to Principal.`);
      } else {
        alert(msg);
      }
    } finally {
      setCircularLoading(false);
    }
  };

  const handleAddPrincipal = async (e) => {
    e.preventDefault();
    if (!principalForm.email.trim()) return;
    try {
      await api.post("/principals", principalForm);
      setPrincipalForm({ name: "", email: "", password: "" });
      loadPrincipals();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add principal");
    }
  };

  const handleUpdatePrincipal = async (e) => {
    e.preventDefault();
    if (!editingPrincipal || !editingPrincipal.email.trim()) return;
    try {
      await api.put(`/principals/${editingPrincipal._id}`, editingPrincipal);
      setEditingPrincipal(null);
      loadPrincipals();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update principal");
    }
  };

  const handleDeletePrincipal = async (id) => {
    if (!confirm("Delete this principal?")) return;
    try {
      await api.delete(`/principals/${id}`);
      loadPrincipals();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete principal");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const statusLabels = {
    DRAFT: "Draft",
    PENDING_PRINCIPAL: "Pending Principal",
    APPROVED: "Approved",
    SENT_BACK: "Sent Back",
  };

  return (
    <div className={`admin-page ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="admin-sidebar-icon">🎓</span>
          <span className="admin-sidebar-title">CoE Admin</span>
        </div>
        <nav className="admin-sidebar-nav">
          <button
            type="button"
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <span className="admin-nav-icon">📊</span>
            <span>Overview</span>
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            <span className="admin-nav-icon">📁</span>
            <span>Content</span>
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === "circulars" ? "active" : ""}`}
            onClick={() => setActiveTab("circulars")}
          >
            <span className="admin-nav-icon">📢</span>
            <span>Circulars</span>
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === "principals" ? "active" : ""}`}
            onClick={() => setActiveTab("principals")}
          >
            <span className="admin-nav-icon">👤</span>
            <span>Principals</span>
          </button>
          <button
            type="button"
            className={`admin-nav-item ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <span className="admin-nav-icon">⚙️</span>
            <span>Account</span>
          </button>
        </nav>
        <button
          type="button"
          className="admin-sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? "Expand" : "Collapse"}
        >
          {sidebarCollapsed ? "→" : "←"}
        </button>
      </aside>

      <main className="admin-main-wrap">
        <header className="admin-header">
          <h1>Admin Control Panel</h1>
          <div className="admin-header-right">
            <button type="button" className="admin-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {activeTab === "overview" && (
          <section className="admin-section animate-fade">
            <div className="admin-cards">
              <div className="admin-card">
                <div className="admin-card-icon">📝</div>
                <h3>Total Exams</h3>
                <p className="admin-card-value">{metrics.totalExams}</p>
                <span className="admin-card-label">Exams conducted</span>
              </div>
              <div className="admin-card">
                <div className="admin-card-icon">🎓</div>
                <h3>Students Examined</h3>
                <p className="admin-card-value">{metrics.studentsExamined.toLocaleString()}</p>
                <span className="admin-card-label">Across all programs</span>
              </div>
              <div className="admin-card">
                <div className="admin-card-icon">⏳</div>
                <h3>Pending Revaluations</h3>
                <p className="admin-card-value">{metrics.pendingRevaluations}</p>
                <span className="admin-card-label">Awaiting processing</span>
              </div>
              <div className="admin-card">
                <div className="admin-card-icon">🕐</div>
                <h3>Last Updated</h3>
                <p className="admin-card-value-sm">{metrics.lastUpdated}</p>
                <span className="admin-card-label">System status</span>
              </div>
            </div>
            <ul className="admin-overview-list">
              <li>Upload latest examination timetable before publishing notifications.</li>
              <li>Verify result data to avoid re-issuance spikes.</li>
              <li>Manage circulars via Principal approval workflow.</li>
            </ul>
          </section>
        )}

        {activeTab === "content" && (
          <section className="admin-section animate-fade">
            <h2>Student Services & Results</h2>
            <div className="admin-forms-grid">
              <form className="admin-form-card" onSubmit={handleTimetableSubmit}>
                <h3>Examination Timetable</h3>
                <label>
                  Display title
                  <input
                    type="text"
                    placeholder="e.g. November 2026 Timetable"
                    value={timetableTitle}
                    onChange={(e) => setTimetableTitle(e.target.value)}
                  />
                </label>
                <button type="submit">Save</button>
              </form>
              <form className="admin-form-card" onSubmit={handleResultsSubmit}>
                <h3>Examination Results</h3>
                <label>
                  Display title
                  <input
                    type="text"
                    placeholder="e.g. April 2026 Results"
                    value={resultsTitle}
                    onChange={(e) => setResultsTitle(e.target.value)}
                  />
                </label>
                <button type="submit">Save</button>
              </form>
              <form className="admin-form-card" onSubmit={handleRevaluationSubmit}>
                <h3>Revaluation Status</h3>
                <label>
                  Display title
                  <input
                    type="text"
                    placeholder="e.g. Revaluation Status - April 2026"
                    value={revaluationTitle}
                    onChange={(e) => setRevaluationTitle(e.target.value)}
                  />
                </label>
                <button type="submit">Save</button>
              </form>
              <form className="admin-form-card" onSubmit={handleResultUpload}>
                <h3>Upload Result File</h3>
                <label>
                  Excel/CSV
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => setResultFile(e.target.files?.[0] || null)}
                  />
                </label>
                <button type="submit">Upload</button>
              </form>
            </div>
          </section>
        )}

        {activeTab === "circulars" && (
          <section className="admin-section animate-fade">
            <h2>Send Circular</h2>
            <p className="admin-section-subtitle">
              Upload PDF or Word document and send to Principal and faculties.
            </p>
            <form className="admin-circular-form" onSubmit={handleCircularSubmit}>
              <div className="admin-circular-grid">
                <label>
                  Circular title
                  <input
                    type="text"
                    placeholder="e.g. End Semester Exam Schedule"
                    value={circularTitle}
                    onChange={(e) => setCircularTitle(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Message (optional)
                  <textarea
                    placeholder="Brief description..."
                    value={circularMessage}
                    onChange={(e) => setCircularMessage(e.target.value)}
                  />
                </label>
                <label className="admin-file-label">
                  Upload PDF or Word (.pdf, .doc, .docx)
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCircularFile(e.target.files?.[0] || null)}
                  />
                  {circularFile && (
                    <span className="admin-file-name">📎 {circularFile.name}</span>
                  )}
                </label>
              </div>
              <button type="submit" className="admin-btn-primary" disabled={circularLoading}>
                {circularLoading ? "Sending..." : "Send to Principal & Faculties"}
              </button>
            </form>

            <h3 className="admin-subsection-title">Recent Circulars</h3>
            <div className="admin-circular-list">
              {circulars.length === 0 ? (
                <p className="admin-empty">No circulars yet.</p>
              ) : (
                circulars.map((c) => (
                  <div key={c._id} className="admin-circular-item">
                    <div>
                      <strong>{c.title}</strong>
                      <span className={`admin-chip admin-chip-${c.status?.toLowerCase().replace("_", "-")}`}>
                        {statusLabels[c.status] || c.status}
                      </span>
                    </div>
                    <div className="admin-circular-meta">
                      {c.fileName && (
                        <a href={`${API_BASE}${c.fileUrl}`} target="_blank" rel="noreferrer">
                          📄 {c.fileName}
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === "principals" && (
          <section className="admin-section animate-fade">
            <h2>Principal Credentials</h2>
            <p className="admin-section-subtitle">Add, edit, or remove principal accounts.</p>

            {!editingPrincipal ? (
              <form className="admin-principal-form" onSubmit={handleAddPrincipal}>
                <h3>Add Principal</h3>
                <div className="admin-principal-grid">
                  <label>
                    Name
                    <input
                      type="text"
                      placeholder="Principal name"
                      value={principalForm.name}
                      onChange={(e) => setPrincipalForm({ ...principalForm, name: e.target.value })}
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      placeholder="principal@university.ac.in"
                      value={principalForm.email}
                      onChange={(e) => setPrincipalForm({ ...principalForm, email: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Password
                    <input
                      type="password"
                      placeholder="Default: principal123"
                      value={principalForm.password}
                      onChange={(e) => setPrincipalForm({ ...principalForm, password: e.target.value })}
                    />
                  </label>
                </div>
                <button type="submit" className="admin-btn-primary">Add Principal</button>
              </form>
            ) : (
              <form className="admin-principal-form" onSubmit={handleUpdatePrincipal}>
                <h3>Edit Principal</h3>
                <div className="admin-principal-grid">
                  <label>
                    Name
                    <input
                      type="text"
                      value={editingPrincipal.name}
                      onChange={(e) => setEditingPrincipal({ ...editingPrincipal, name: e.target.value })}
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      value={editingPrincipal.email}
                      onChange={(e) => setEditingPrincipal({ ...editingPrincipal, email: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    New Password (leave blank to keep)
                    <input
                      type="password"
                      placeholder="••••••••"
                      onChange={(e) => setEditingPrincipal({ ...editingPrincipal, password: e.target.value })}
                    />
                  </label>
                </div>
                <div className="admin-form-actions">
                  <button type="submit" className="admin-btn-primary">Save</button>
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() => setEditingPrincipal(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <h3 className="admin-subsection-title">Principals</h3>
            {principalsLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="admin-principal-list">
                {principals.map((p) => (
                  <div key={p._id} className="admin-principal-item">
                    <div>
                      <strong>{p.name}</strong>
                      <span className="admin-principal-email">{p.email}</span>
                    </div>
                    <div className="admin-principal-actions">
                      <button
                        type="button"
                        className="admin-btn-small"
                        onClick={() => setEditingPrincipal({ ...p, password: "" })}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="admin-btn-small admin-btn-danger"
                        onClick={() => handleDeletePrincipal(p._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "account" && (
          <section className="admin-section animate-fade">
            <h2>Account Settings</h2>
            <form className="admin-account-form" onSubmit={handleAccountSubmit}>
              <label>
                Current password
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </label>
              <label>
                New email
                <input
                  type="email"
                  placeholder="examcontroller@university.ac.in"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </label>
              <label>
                New password
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <button type="submit" className="admin-btn-primary">Save changes</button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
