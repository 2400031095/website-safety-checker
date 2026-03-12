import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Contact from "./contact";
import RiskScore from "./components/RiskScore";

/* -------------------- CYBER ATTACK BACKGROUND -------------------- */

function CyberMap(){
  return(
    <div className="cyber-map-global">

      <div className="attack-dot a1"></div>
      <div className="attack-dot a2"></div>
      <div className="attack-dot a3"></div>
      <div className="attack-dot a4"></div>
      <div className="attack-dot a5"></div>
      <div className="attack-dot a6"></div>

    </div>
  )
}

/* -------------------- HOME -------------------- */

function Home() {

  const [url,setUrl] = useState("")
  const [result,setResult] = useState(null)

  const handleCheck = async () => {

    try{

      const API_BASE = "http://localhost:5001"

      const response = await fetch(`${API_BASE}/api/check-website`,{
        method:"POST",
        headers:{ "Content-Type":"application/json"},
        body: JSON.stringify({url})
      })

      const data = await response.json()

      setResult(data)

    }catch(err){

      setResult({
        success:false,
        message:"Backend connection failed"
      })

    }

  }

  return(

    <main className="app-main">

      <CyberMap/>

      <div className="box">

        <h2>Website Safety Checker</h2>
        <p>Scan any website and detect security threats instantly.</p>

        <div className="input-group">

          <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
          className="url-input"
          />

          <button onClick={handleCheck} className="check-button">
            Scan Website
          </button>

        </div>

        {result && (

          <div className="result-card">

            {result.success === false && (
              <p className="error-text">{result.message}</p>
            )}

            {result.url && (
              <p className="url-display">
                🔗 {result.url}
              </p>
            )}

            {result.verdict && (
              <h3 className="verdict">
                {result.verdict === "Safe" ? "🟢 Website is Safe" : "🔴 Potentially Unsafe"}
              </h3>
            )}

            {result.details && (

              <div className="analysis-grid">

                <div className="analysis-card">
                  <h4>Malicious</h4>
                  <p>{result.details.malicious}</p>
                </div>

                <div className="analysis-card">
                  <h4>Suspicious</h4>
                  <p>{result.details.suspicious}</p>
                </div>

                <div className="analysis-card">
                  <h4>Harmless</h4>
                  <p>{result.details.harmless}</p>
                </div>

              </div>

            )}

            {result.details && (
              <RiskScore stats={result.details}/>
            )}

          </div>

        )}

      </div>

    </main>

  )
}

/* -------------------- ABOUT -------------------- */

function About(){

  return(

    <main className="app-main">

      <CyberMap/>

      <div className="about-grid">

        <div className="box about-box">

          <h2>👩‍💻 About the Creator</h2>

          <p>

          <strong>Pujitha Vempala</strong> is a Computer Science student
          focusing on Artificial Intelligence, Cybersecurity, and Generative AI.

          She enjoys building intelligent systems that combine
          secure backend architectures with modern user interfaces.

          </p>

          <p>

          This project demonstrates her interest in
          **cyber defense, phishing detection, and security automation**.

          </p>

          <a
          href="https://www.linkedin.com/in/pujitha-vempala-991202365"
          target="_blank"
          rel="noreferrer"
          className="linkedin-btn"
          >
          🔗 View LinkedIn Profile
          </a>

        </div>

        <div className="box about-box">

          <h2>🌐 What CheckFix Does</h2>

          <p>

          CheckFix is a security tool designed to help users verify whether a website
          is safe before interacting with it.

          </p>

          <ul>

            <li>Detects suspicious URLs</li>
            <li>Uses VirusTotal security intelligence</li>
            <li>Provides safety verdicts instantly</li>
            <li>Shows threat analysis statistics</li>

          </ul>

        </div>

        <div className="box about-box">

          <h2>📦 Features</h2>

          <ul>

            <li>Website safety scanning</li>
            <li>VirusTotal threat analysis</li>
            <li>Risk score visualization</li>
            <li>Cyber-attack themed interface</li>

          </ul>

        </div>

      </div>

    </main>

  )

}

/* -------------------- APP -------------------- */

function App(){

  return(

    <Router>

      <div className="app-container">

        <header className="app-header">

          <h1>🛡 CheckFix</h1>
          <p className="subtitle">AI Website Security Scanner</p>

          <div className="nav-boxes">

            <Link to="/" className="nav-card">
              🏠
              <span>Home</span>
            </Link>

            <Link to="/about" className="nav-card">
              ℹ️
              <span>About</span>
            </Link>

            <Link to="/contact" className="nav-card">
              📩
              <span>Contact</span>
            </Link>

          </div>

        </header>

        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>

        </Routes>

        <footer className="app-footer">

          © 2026 CheckFix  
          Built by Pujitha Vempala

        </footer>

      </div>

    </Router>

  )

}

export default App