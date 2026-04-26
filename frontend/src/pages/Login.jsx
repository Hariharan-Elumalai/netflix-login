import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Please enter a valid email or phone number.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Your password must contain between 4 and 60 characters.";
    } else if (form.password.length < 4) {
      newErrors.password = "Your password must contain between 4 and 60 characters.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setApiError("");
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: form.email,
        password: form.password,
      });
      if (res.data.success) {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nf-root">
      {/* Animated background */}
      <div className="nf-bg">
        <div className="nf-orb nf-orb1" />
        <div className="nf-orb nf-orb2" />
        <div className="nf-orb nf-orb3" />
        <div className="nf-grid" />
        <div className="nf-bg-overlay" />
      </div>

      {/* Header */}
      <header className="nf-header">
        <div className="nf-logo">
          <span className="nf-logo-text">NETFLIX</span>
        </div>
      </header>

      {/* Login Card */}
      <main className="nf-main">
        <div className="nf-card">
          <div className="nf-card-glow" />
          <h1 className="nf-title">Sign In</h1>
          <p className="nf-subtitle">Welcome back. Continue your story.</p>

          {apiError && (
            <div className="nf-api-error">
              <span className="nf-error-icon">⚠</span> {apiError}
            </div>
          )}

          <form className="nf-form" onSubmit={handleSubmit} noValidate>
            <div className={`nf-field ${errors.email ? "nf-field--error" : form.email ? "nf-field--filled" : ""}`}>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="nf-input"
                placeholder=" "
              />
              <label htmlFor="email" className="nf-label">Email or phone number</label>
              {errors.email && <span className="nf-error-msg">⚠ {errors.email}</span>}
            </div>

            <div className={`nf-field nf-field--pass ${errors.password ? "nf-field--error" : form.password ? "nf-field--filled" : ""}`}>
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="nf-input"
                placeholder=" "
              />
              <label htmlFor="password" className="nf-label">Password</label>
              <button
                type="button"
                className="nf-show-pass"
                onClick={() => setShowPass((v) => !v)}
                tabIndex={-1}
              >
                {showPass ? "HIDE" : "SHOW"}
              </button>
              {errors.password && <span className="nf-error-msg">⚠ {errors.password}</span>}
            </div>

            <button type="submit" className="nf-btn" disabled={loading}>
              {loading ? <span className="nf-spinner" /> : "Sign In"}
            </button>
          </form>

          <div className="nf-help-row">
            <label className="nf-remember">
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <a href="#" className="nf-link">Need help?</a>
          </div>

          <div className="nf-divider"><span>OR</span></div>

          <button className="nf-code-btn">Use a sign-in code</button>

          <div className="nf-signup">
            <span className="nf-muted">New to Netflix?</span>{" "}
            <a href="#" className="nf-link nf-link--bright">Sign up now</a>
          </div>

          <p className="nf-recaptcha">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <a href="#" className="nf-link nf-link--blue">Learn more.</a>
          </p>

          <div className="nf-demo-hint">
            <p>🎬 Demo credentials</p>
            <code>user@netflix.com / netflix123</code>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="nf-footer">
        <p className="nf-footer-text">Questions? Call 000-800-919-1694</p>
        <div className="nf-footer-links">
          {["FAQ", "Help Center", "Terms of Use", "Privacy", "Cookie Preferences", "Corporate Information"].map((l) => (
            <a key={l} href="#" className="nf-footer-link">{l}</a>
          ))}
        </div>
        <div className="nf-lang">
          <span>🌐</span>
          <select className="nf-lang-select">
            <option>English</option>
            <option>हिन्दी</option>
            <option>Tamil</option>
          </select>
        </div>
      </footer>
    </div>
  );
}
