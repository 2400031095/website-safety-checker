import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example backend call (you can replace with your real API later)
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setMessage(data.message || "Login successful!");
    } catch (error) {
      setMessage("Error connecting to backend.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>CheckFix Login</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>

        {message && (
          <p style={{ marginTop: "1rem", textAlign: "center", color: "#333" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;