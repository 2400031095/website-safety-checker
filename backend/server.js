// -------------------- Imports --------------------
const express = require("express");
const cors = require("cors");
const path = require("path");

// Banking check module
const checkBankingURL = require("./checkBanking");

// -------------------- App Setup --------------------
const app = express();
const PORT = process.env.PORT || 5001;

// VirusTotal API key (future use)
const API_KEY = "feefe7b18db333a11ffb5ab301a710ca54aa2adfb86bcaaafb9ba9a194471140";

app.use(cors());
app.use(express.json());

// Startup log
console.log("🚀 Backend starting...");

// -------------------- Routes --------------------

// Root route
app.get("/", (req, res) => {
  res.send("✅ CheckFix Backend is running!");
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running!" });
});

// Website check route
app.post("/api/check-website", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({
      success: false,
      verdict: "Error",
      details: "URL is required",
    });
  }

  // ---------------- Domain Analysis ----------------
  const suspiciousWords = ["login", "verify", "secure", "bank", "update"];
  let domain = "";
  let suspiciousScore = 0;

  try {
    domain = new URL(url).hostname;

    suspiciousWords.forEach(word => {
      if (domain.includes(word)) {
        suspiciousScore++;
      }
    });

  } catch (err) {
    console.log("Invalid URL format");
  }

  // Banking check
  const bankingResult = checkBankingURL(url);

  // Simulate unsafe phishing URLs
  if (url.includes("phishing")) {
    return res.json({
      success: true,
      url,
      verdict: "Unsafe",
      details: { malicious: 5, suspicious: 2, undetected: 0, harmless: 0 },
      banking: { status: "Suspicious", domain: "phishing-example.com" },
      domainAnalysis: {
        domain,
        suspiciousIndicators: suspiciousScore
      }
    });
  }

  // Default Safe response
  return res.json({
    success: true,
    url,
    verdict: "Safe",
    details: { malicious: 0, suspicious: 0, undetected: 10, harmless: 20 },
    banking: { status: "Legitimate", domain: "examplebank.com" },
    domainAnalysis: {
      domain,
      suspiciousIndicators: suspiciousScore
    }
  });
});

// ---------------- Login Route ----------------
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

// ---------------- Contact Route ----------------
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  console.log("📩 New contact message:", { name, email, message });

  res.json({ success: true, message: "Message received! We'll get back to you soon." });
});

// ---------------- Frontend Serving ----------------
app.use(express.static(path.join(__dirname, "../frontend/build")));

// ---------------- Server Startup ----------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
