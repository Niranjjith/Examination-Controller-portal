import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AdminDashboard.css";

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
  const [approvalStage, setApprovalStage] = useState("DRAFT"); // DRAFT | PRINCIPAL | HOD | APPROVED

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Simple overview metrics (can be wired to backend later)
  const [metrics] = useState({
    totalExams: 162,
    studentsExamined: 15234,
    pendingRevaluations: 24,
    lastUpdated: "Today, 10:15 AM",
  });

  const [activeTab, setActiveTab] = useState("overview"); // overview | content | account

  const handleTimetableSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with backend API for uploading timetable
    console.log("Timetable saved:", { timetableTitle });
  };

  const handleResultsSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with backend API for uploading results
    console.log("Results saved:", { resultsTitle });
  };

  const handleRevaluationSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with backend API for updating revaluation status
    console.log("Revaluation saved:", { revaluationTitle });
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    // TODO: integrate with backend API for updating admin credentials
    console.log("Account update:", { currentPassword, newEmail, newPassword });
  };

  const handleResultUpload = (e) => {
    e.preventDefault();
    if (!resultFile) return;
    // TODO: integrate with backend API for uploading result excel file
    console.log("Result file selected:", resultFile.name);
  };

  const advanceApprovalStage = () => {
    setApprovalStage((prev) => {
      if (prev === "DRAFT") return "PRINCIPAL";
      if (prev === "PRINCIPAL") return "HOD";
      if (prev === "HOD") return "APPROVED";
      return "DRAFT";
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1>Admin Control Panel</h1>
          <p>
            Manage examination content and settings shown on the public
            Controller of Examinations portal.
          </p>
        </div>
        <div className="admin-header-right">
          <div className="admin-credentials-hint">
            <span className="admin-credentials-label">Default admin</span>
            <span>examcontroller@gmail.com / 123456</span>
          </div>
          <button
            type="button"
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <section className="admin-summary-cards">
        <div className="admin-summary-card">
          <h2>Total Exams</h2>
          <p className="admin-metric">{metrics.totalExams}</p>
          <span className="admin-metric-label">Exams conducted</span>
        </div>
        <div className="admin-summary-card">
          <h2>Students Examined</h2>
          <p className="admin-metric">{metrics.studentsExamined.toLocaleString()}</p>
          <span className="admin-metric-label">Across all programs</span>
        </div>
        <div className="admin-summary-card">
          <h2>Pending Revaluations</h2>
          <p className="admin-metric">{metrics.pendingRevaluations}</p>
          <span className="admin-metric-label">Awaiting processing</span>
        </div>
        <div className="admin-summary-card">
          <h2>Last Updated</h2>
          <p className="admin-metric-small">{metrics.lastUpdated}</p>
          <span className="admin-metric-label">System status</span>
        </div>
      </section>

      <nav className="admin-tabs">
        <button
          type="button"
          className={`admin-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          type="button"
          className={`admin-tab ${activeTab === "content" ? "active" : ""}`}
          onClick={() => setActiveTab("content")}
        >
          Student Services Content
        </button>
        <button
          type="button"
          className={`admin-tab ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          Account Settings
        </button>
      </nav>

      <main className="admin-main">
        {activeTab === "overview" && (
          <section className="admin-section">
            <h2>Overview</h2>
            <p className="admin-section-subtitle">
              High-level snapshot of examinations, results, and revaluation
              activity for the current academic year.
            </p>
            <ul className="admin-overview-list">
              <li>
                Ensure the latest examination timetable is uploaded before
                publishing notifications on the public portal.
              </li>
              <li>
                Verify result data before publishing to avoid re-issuance and
                revaluation spikes.
              </li>
              <li>
                Regularly review revaluation backlogs and communicate timelines
                through notifications.
              </li>
            </ul>
          </section>
        )}

        {activeTab === "content" && (
          <section className="admin-section">
            <h2>Student Services & Results</h2>
            <p className="admin-section-subtitle">
              Configure what students see in Student Quick Access and upload
              result data for publication.
            </p>

            <div className="admin-forms-grid">
              <form className="admin-form-card" onSubmit={handleTimetableSubmit}>
                <h3>Examination Timetable</h3>
                <p>Set the title or link description used for the timetable.</p>
                <label>
                  Display title
                  <input
                    type="text"
                    placeholder="e.g. November 2026 Timetable"
                    value={timetableTitle}
                    onChange={(e) => setTimetableTitle(e.target.value)}
                  />
                </label>
                <button type="submit">Save timetable</button>
              </form>

              <form className="admin-form-card" onSubmit={handleResultsSubmit}>
                <h3>Examination Results</h3>
                <p>Update the label or link used for results.</p>
                <label>
                  Display title
                  <input
                    type="text"
                    placeholder="e.g. April 2026 Results"
                    value={resultsTitle}
                    onChange={(e) => setResultsTitle(e.target.value)}
                  />
                </label>
                <button type="submit">Save results</button>
              </form>

              <form className="admin-form-card" onSubmit={handleRevaluationSubmit}>
                <h3>Revaluation Status</h3>
                <p>Control the messaging for revaluation tracking.</p>
                <label>
                  Display title
                  <input
                    type="text"
                    placeholder="e.g. Revaluation Status - April 2026"
                    value={revaluationTitle}
                    onChange={(e) => setRevaluationTitle(e.target.value)}
                  />
                </label>
                <button type="submit">Save revaluation</button>
              </form>

              <form className="admin-form-card" onSubmit={handleResultUpload}>
                <h3>Upload Result File</h3>
                <p>Upload an Excel/CSV file containing examination results.</p>
                <label>
                  Result file
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={(e) => setResultFile(e.target.files?.[0] || null)}
                  />
                </label>
                <button type="submit">Upload results file</button>
              </form>
            </div>
          </section>
        )}

        {activeTab === "account" && (
          <section className="admin-section">
            <h2>Account & Circular Approvals</h2>
            <p className="admin-section-subtitle">
              Update admin login credentials and manage circular approval
              workflow (Principal & HOD).
            </p>

            <form className="admin-account-form" onSubmit={handleAccountSubmit}>
              <div className="admin-account-grid">
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
                  New username (email)
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
              </div>

              <button type="submit" className="admin-account-submit">
                Save account changes
              </button>
            </form>

            <div className="admin-circular-card">
              <div className="admin-circular-header">
                <h3>Send Circular & Approvals</h3>
                <span className={`admin-approval-chip stage-${approvalStage.toLowerCase()}`}>
                  {approvalStage === "DRAFT" && "Draft"}
                  {approvalStage === "PRINCIPAL" && "Pending Principal Approval"}
                  {approvalStage === "HOD" && "Pending HOD Approval"}
                  {approvalStage === "APPROVED" && "Approved"}
                </span>
              </div>
              <p className="admin-circular-subtitle">
                Prepare circular text, send for Principal approval, then route to
                HODs before publishing to students.
              </p>
              <div className="admin-circular-grid">
                <label>
                  Circular title
                  <input
                    type="text"
                    placeholder="e.g. End Semester Exam Schedule - Nov 2026"
                    value={circularTitle}
                    onChange={(e) => setCircularTitle(e.target.value)}
                  />
                </label>
                <label>
                  Circular message
                  <textarea
                    placeholder="Enter brief circular content to share with stakeholders..."
                    value={circularMessage}
                    onChange={(e) => setCircularMessage(e.target.value)}
                  />
                </label>
              </div>
              <div className="admin-circular-actions">
                <button
                  type="button"
                  className="admin-circular-advance"
                  onClick={advanceApprovalStage}
                >
                  {approvalStage === "DRAFT" && "Send to Principal"}
                  {approvalStage === "PRINCIPAL" && "Approve & send to HOD"}
                  {approvalStage === "HOD" && "Approve & finalize"}
                  {approvalStage === "APPROVED" && "Reset to draft"}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}


