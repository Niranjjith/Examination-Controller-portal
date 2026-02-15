import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import "./PrincipalDashboard.css";

const API_BASE = "http://localhost:5000";

const TABS = [
  { key: "pending", label: "Pending", status: "PENDING_PRINCIPAL" },
  { key: "approved", label: "Approved", status: "APPROVED" },
  { key: "denied", label: "Denied", status: "SENT_BACK" },
  { key: "history", label: "History", status: null },
];

export default function PrincipalDashboard() {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const loadCirculars = async () => {
    setLoading(true);
    try {
      const res = await api.get("/circulars");
      setCirculars(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCirculars();
  }, []);

  const filteredCirculars = (() => {
    if (activeTab === "history") return circulars;
    const tab = TABS.find((t) => t.key === activeTab);
    if (!tab?.status) return circulars;
    return circulars.filter((c) => c.status === tab.status);
  })();

  const pendingCount = circulars.filter((c) => c.status === "PENDING_PRINCIPAL").length;
  const approvedCount = circulars.filter((c) => c.status === "APPROVED").length;
  const deniedCount = circulars.filter((c) => c.status === "SENT_BACK").length;

  const handleApprove = async (id) => {
    try {
      await api.post(`/circulars/${id}/approve`);
      loadCirculars();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve");
    }
  };

  const handleSendBack = async (id) => {
    try {
      await api.post(`/circulars/${id}/send-back`, {
        reason: rejectReason || "Please revise and resubmit.",
      });
      setRejectingId(null);
      setRejectReason("");
      loadCirculars();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send back");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getStatusChip = (status) => {
    if (status === "PENDING_PRINCIPAL") return <span className="principal-chip principal-chip-pending">Pending</span>;
    if (status === "APPROVED") return <span className="principal-chip principal-chip-approved">Approved</span>;
    if (status === "SENT_BACK") return <span className="principal-chip principal-chip-denied">Denied</span>;
    return <span className="principal-chip principal-chip-default">{status}</span>;
  };

  const renderCard = (c) => {
    const isPending = c.status === "PENDING_PRINCIPAL";

    return (
      <div key={c._id} className="principal-card">
        <div className="principal-card-header">
          <h3>{c.title}</h3>
          {getStatusChip(c.status)}
        </div>
        {c.message && <p className="principal-message">{c.message}</p>}
        {c.fileName && (
          <a href={`${API_BASE}${c.fileUrl}`} target="_blank" rel="noreferrer" className="principal-file-link">
            📄 {c.fileName}
          </a>
        )}
        <div className="principal-card-footer">
          <span className="principal-meta">
            From: {c.createdBy?.name || "Admin"} • {new Date(c.createdAt).toLocaleString()}
            {c.approvedBy && ` • Approved by ${c.approvedBy.name} on ${new Date(c.updatedAt).toLocaleString()}`}
            {c.rejectionReason && (
              <span className="principal-rejection"> • Reason: {c.rejectionReason}</span>
            )}
          </span>
          {isPending && (
            <div className="principal-actions">
              <button
                type="button"
                className="principal-btn principal-btn-approve"
                onClick={() => handleApprove(c._id)}
              >
                Approve
              </button>
              {rejectingId === c._id ? (
                <div className="principal-reject-form">
                  <input
                    type="text"
                    placeholder="Reason for sending back (optional)"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="principal-reject-input"
                  />
                  <div>
                    <button
                      type="button"
                      className="principal-btn principal-btn-send"
                      onClick={() => handleSendBack(c._id)}
                    >
                      Send Back
                    </button>
                    <button
                      type="button"
                      className="principal-btn principal-btn-cancel"
                      onClick={() => {
                        setRejectingId(null);
                        setRejectReason("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="principal-btn principal-btn-reject"
                  onClick={() => setRejectingId(c._id)}
                >
                  Send Back
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEmpty = () => {
    const messages = {
      pending: "No circulars pending your approval.",
      approved: "No approved circulars yet.",
      denied: "No denied circulars.",
      history: "No circular history.",
    };
    return (
      <div className="principal-empty">
        <span className="principal-empty-icon">
          {activeTab === "pending" ? "✅" : activeTab === "approved" ? "✓" : "📋"}
        </span>
        <h3>
          {activeTab === "pending" ? "All caught up" : activeTab === "approved" ? "None approved" : "No items"}
        </h3>
        <p>{messages[activeTab]}</p>
      </div>
    );
  };

  return (
    <div className="principal-page">
      <aside className="principal-sidebar">
        <div className="principal-brand">
          <span className="principal-icon">🎓</span>
          <h2>Principal</h2>
          <p>Circular Approvals</p>
        </div>
        <nav className="principal-nav">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`principal-nav-item ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {tab.key === "pending" && pendingCount > 0 && (
                <span className="principal-badge">{pendingCount}</span>
              )}
              {tab.key === "approved" && approvedCount > 0 && (
                <span className="principal-badge principal-badge-approved">{approvedCount}</span>
              )}
              {tab.key === "denied" && deniedCount > 0 && (
                <span className="principal-badge principal-badge-denied">{deniedCount}</span>
              )}
            </button>
          ))}
        </nav>
        <button type="button" className="principal-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="principal-main">
        <header className="principal-header">
          <h1>Circular Approval Dashboard</h1>
          <p>
            {activeTab === "pending" && "Review and approve or send back circulars."}
            {activeTab === "approved" && "Circulars you have approved."}
            {activeTab === "denied" && "Circulars you have sent back."}
            {activeTab === "history" && "All circulars you have reviewed."}
          </p>
        </header>

        {loading ? (
          <p className="principal-loading">Loading circulars...</p>
        ) : filteredCirculars.length === 0 ? (
          renderEmpty()
        ) : (
          <div className="principal-list">{filteredCirculars.map(renderCard)}</div>
        )}
      </main>
    </div>
  );
}
