// -------------------- Imports --------------------
const express = require("express");
const cors = require("cors");
const path = require("path");

// Banking check module (make sure checkBanking.js exists)
const checkBankingURL = require("./checkBanking");

// -------------------- App Setup --------------------
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ VirusTotal API key (for future real mode)
const API_KEY = "feefe7b18db333a11ffb5ab301a710ca54aa2adfb86bcaaafb9ba9a194471140";

app.use(cors());
app.use(express.json());

// Startup log
console.log("🚀 Backend starting...");

// -------------------- Routes --------------------

// Root route for backend
app.get("/", (req, res) => {
  res.send("✅ CheckFix Backend is running!");
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running!" });
});

// Website check route (DEV mode: instant dummy responses)
app.post("/api/check-website", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({
      success: false,
      verdict: "Error",
      details: "URL is required",
    });
  }

  // ✅ Banking check (dummy for now)
  const bankingResult = checkBankingURL(url);

  // ✅ Simulate Unsafe verdict for phishing URLs
  if (url.includes("phishing")) {
    return res.json({
      success: true,
      url,
      verdict: "Unsafe",
      details: { malicious: 5, suspicious: 2, undetected: 0, harmless: 0 },
      banking: { status: "Suspicious", domain: "phishing-example.com" },
    });
  }

  // ✅ Default Safe response
  return res.json({
    success: true,
    url,
    verdict: "Safe",
    details: { malicious: 0, suspicious: 0, undetected: 10, harmless: 20 },
    banking: { status: "Legitimate", domain: "examplebank.com" },
  });
});

// Login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  const demoUser = { email: "admin@checkfix.com", password: "123456" };

  if (email === demoUser.email && password === demoUser.password) {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials." });
  }
});

// Contact route
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  console.log("📩 New contact message:", { name, email, message });

  res.json({ success: true, message: "Message received! We'll get back to you soon." });
});

// -------------------- Frontend Serving --------------------
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// -------------------- Server Startup --------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
