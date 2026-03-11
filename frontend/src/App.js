import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Contact from "./contact";
import RiskScore from "./components/RiskScore";

// -------------------- Home Component --------------------
function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    try {
      const API_BASE = "https://website-safety-checker-s2hu.vercel.app"; // deployed backend URL

      const response = await fetch(`${API_BASE}/api/check-website`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error checking website:", error);
      setResult({ success: false, message: "Error connecting to backend." });
    }
  };

  // Helper to render verdict badge
  const renderBadge = (verdict) => {
    if (!verdict) return null;
    const v = verdict.toLowerCase();
    if (v.includes("safe")) {
      return <span className="badge badge-safe">SAFE</span>;
    } else if (v.includes("unsafe")) {
      return <span className="badge badge-unsafe">UNSAFE</span>;
    } else {
      return <span className="badge badge-pending">SUSPICIOUS</span>;
    }
  };

  return (
    <main className="app-main">
      <div className="box">
        <h2>Website Safety Checker</h2>
        <p>Quickly verify if a website is safe to visit.</p>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter website URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="url-input"
          />
          <button onClick={handleCheck} className="check-button">
            Check Website
          </button>
        </div>

        {result && (
          <div className="result-card">
            <h3>Result</h3>
            <p><strong>URL:</strong> {result.url}</p>
            <p>
              <strong>Verdict:</strong> {result.verdict} {renderBadge(result.verdict)}
            </p>

            {/* Banking Verdict */}
            {result.banking && (
              <div className="banking-box">
                <h4>🏦 Banking Verdict</h4>
                <p><strong>Status:</strong> {result.banking.status}</p>
                <p><strong>Domain:</strong> {result.banking.domain || "N/A"}</p>
              </div>
            )}

            {/* VirusTotal Stats */}
            {typeof result.details === "object" ? (
              <div className="virustotal-box">
                <h4>🛡️ VirusTotal Stats</h4>
                <p><strong>Malicious:</strong> {result.details.malicious}</p>
                <p><strong>Suspicious:</strong> {result.details.suspicious}</p>
                <p><strong>Undetected:</strong> {result.details.undetected}</p>

                {/* Risk Score Bar */}
                <RiskScore stats={result.details} />
              </div>
            ) : (
              <p><strong>Details:</strong> {result.details}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

// -------------------- About Component --------------------
function About() {
  return (
    <main className="app-main">
      <div className="box">
        <h2>About Us</h2>
        <p>
          CheckFix was created to give users a simple, reliable way to verify
          whether a website is safe before visiting it. The core of our platform
          is the <strong>Website Safety Checker box</strong> you see on the Home
          page — enter any URL, and our system instantly analyzes it.
        </p>
        <p>
          Behind the scenes, CheckFix combines trusted security APIs like
          <strong> VirusTotal</strong> with our own <strong>Banking URL
          detection</strong> logic. This means you not only get a verdict on
          whether a site is malicious, but also whether it’s a legitimate bank
          domain or a suspicious imitation.
        </p>
        <p>The website contains three main sections:</p>
        <ul>
          <li><strong>Home:</strong> Safety checker box with verdicts and risk score.</li>
          <li><strong>About Us:</strong> Learn about our mission and how we protect users.</li>
          <li><strong>Contact Us:</strong> Reach out with feedback or security concerns.</li>
        </ul>
        <p>
          Our mission is clear: <em>to make browsing safer by combining AI,
          cybersecurity, and banking awareness into one easy‑to‑use tool.</em>
        </p>
      </div>
    </main>
  );
}

// -------------------- App Component with Routing --------------------
function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>🔍 CheckFix</h1>
          <p className="subtitle">Quickly verify if a website is safe</p>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="app-footer">
          <p>© 2026 CheckFix | Secure browsing made simple</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
