import React from "react";

function About() {
  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>
        About Us
      </h2>

      {/* Maker Box */}
      <div style={{
        border: "1px solid #2c3e50",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
        background: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#2c3e50" }}>👩‍💻 About the Maker</h3>
        <p>
          My name is <strong>Pujitha Vempala</strong>, currently studying Computer Science Engineering 
          at <strong>KL University, Vijayawada</strong>. I am in my <strong>2nd year</strong>, specializing 
          in Generative AI. I am passionate about building robust backend systems, seamless frontend workflows, 
          and creating user‑friendly applications that solve real‑world problems.
        </p>
        <p>
          My interests include exploring AI models, enhancing UI/UX design, and integrating advanced features 
          like error handling, notifications, and intelligent automation to make apps more reliable and professional.
        </p>
      </div>

      {/* Purpose Box */}
      <div style={{
        border: "1px solid #2c3e50",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
        background: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#2c3e50" }}>🎯 What This App Does</h3>
        <p>
          <strong>CheckFix</strong> helps users verify the safety of websites using VirusTotal integration. 
          It provides clear verdicts like <em>Safe</em> or <em>Unsafe</em>, with detailed stats, fallback messaging, 
          and a polished UI experience.
        </p>
      </div>

      {/* Features Box */}
      <div style={{
        border: "1px solid #2c3e50",
        borderRadius: "8px",
        padding: "20px",
        background: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#2c3e50" }}>⚡ Key Features</h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>Real‑time website safety checks</li>
          <li>Colored verdict badges for clarity</li>
          <li>Toast notifications for user feedback</li>
          <li>Debug JSON views for transparency</li>
          <li>Contact form for direct communication</li>
        </ul>
      </div>
    </div>
  );
}

export default About;