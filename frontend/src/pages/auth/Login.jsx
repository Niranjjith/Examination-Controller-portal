import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));

      if (payload.role === "ADMIN") navigate("/admin");
      else if (payload.role === "CENTER") navigate("/center");
      else navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data?.message || "Invalid email or password.");
      } else {
        setError("Unable to sign in. Please try again.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">🎓</div>
          <h1>Controller of Examinations</h1>
          <p>Secure access for administrators and examination centers.</p>
        </div>

        <form className="login-form" onSubmit={submit}>
          <h2>Sign in</h2>
          <p className="login-subtitle">
            Use your official university credentials to continue.
          </p>

          {error && <p className="login-error">{error}</p>}

          <div className="login-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@university.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field password-field">
            <label htmlFor="password">Password</label>
            <div className="login-password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>

          <p className="login-note">
            Having trouble signing in? Contact the CoE helpdesk.
          </p>
        </form>
      </div>
    </div>
  );
}

