import { useState } from "react";

const DEMO_EMAIL = "demo@novapulse.dev";
const DEMO_PASSWORD = "Nova@12345";

function Brand() {
  return <div className="brand"><span className="brand-mark">N</span><span>nova<span className="brand-light">pulse</span></span></div>;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) return setError("Please complete both fields.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return setError("Enter a valid email address.");
    if (password.length < 8) return setError("Your password must be at least 8 characters.");

    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to sign in.");
      onLogin(data.user, remember);
    } catch (err) {
      setError(err.message || "Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-layout">
      <section className="visual-panel">
        <div className="visual-top"><Brand /><span className="status"><i /> ALL SYSTEMS NORMAL</span></div>
        <div className="visual-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR WORKSPACE, IN SYNC</div>
          <h1>Make room for<br /><em>what matters.</em></h1>
          <p>A calmer space to focus, create, and move your best work forward.</p>
        </div>
        <div className="orbit-art" aria-hidden="true">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
          <div className="orbit-core"><span>N</span></div><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" />
        </div>
        <div className="visual-footer"><span>DESIGNED FOR YOUR NEXT CHAPTER</span><span>01 / 03</span></div>
      </section>

      <section className="form-panel">
        <div className="mobile-brand"><Brand /></div>
        <div className="form-wrap">
          <div className="welcome-tag">WELCOME BACK</div>
          <h2>Sign in to your<br />account<span>.</span></h2>
          <p className="subheading">Good to see you again. Enter your details to continue.</p>

          <form onSubmit={submit} noValidate>
            <label htmlFor="email">Email address</label>
            <div className="input-wrap"><span className="input-icon">✉</span><input id="email" type="email" autoComplete="username" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></div>

            <div className="password-label"><label htmlFor="password">Password</label><button type="button" className="text-button" onClick={() => setError("Password reset is not enabled in this demo.")}>Forgot password?</button></div>
            <div className="input-wrap"><span className="input-icon">⌑</span><input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} /><button type="button" className="show-button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div>

            <label className="remember"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /><span className="checkmark" /> Keep me signed in</label>
            {error && <div className="error-message" role="alert">{error}</div>}
            <button className="submit-button" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"} <span>↗</span></button>
          </form>

          <div className="demo-box"><div className="demo-heading"><span className="demo-icon">✦</span><strong>Just exploring?</strong><span className="demo-pill">DEMO ACCESS</span></div><p>Email: <code>{DEMO_EMAIL}</code></p><p>Password: <code>{DEMO_PASSWORD}</code></p><button type="button" className="fill-demo" onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); setError(""); }}>Use demo credentials <span>→</span></button></div>
          <p className="terms">By continuing, you agree to our <a href="#terms" onClick={e => e.preventDefault()}>Terms</a> and <a href="#privacy" onClick={e => e.preventDefault()}>Privacy Policy</a>.</p>
        </div>
        <div className="form-footer"><span>© 2026 NOVAPULSE</span><span>MADE FOR MOMENTUM <b>✳</b></span></div>
      </section>
    </main>
  );
}

function Dashboard({ user, onLogout }) {
  return <main className="dashboard">
    <header className="dash-header"><Brand /><button className="logout" onClick={onLogout}>Sign out ↗</button></header>
    <section className="dash-content"><div className="welcome-tag">YOUR WORKSPACE</div><h1>You're in, {user.name.split(" ")[0]}<span>.</span></h1><p className="subheading">Your NovaPulse demo dashboard is ready. This is the successful-login destination.</p>
      <div className="dash-grid"><article><span className="dash-symbol">✦</span><h3>Everything in sync</h3><p>Your demo session is active and the API has verified your credentials.</p></article><article><span className="dash-symbol">↗</span><h3>Keep moving forward</h3><p>Build on this starter with your own pages, features, and brand identity.</p></article></div>
      <div className="signed-in">SIGNED IN AS <strong>{user.email}</strong></div>
    </section>
  </main>;
}

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("novapulseUser") || "null"); } catch { return null; }
  });
  function login(profile, remember) {
    setUser(profile);
    if (remember) sessionStorage.setItem("novapulseUser", JSON.stringify(profile));
  }
  function logout() { sessionStorage.removeItem("novapulseUser"); setUser(null); }
  return user ? <Dashboard user={user} onLogout={logout} /> : <Login onLogin={login} />;
}