import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!url.trim()) {
      toast.warn("⚠️ Please enter a website URL first.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/check-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);
      setResult(data);

      const verdict = (data.verdict || "").toLowerCase();

      if (verdict.includes("unsafe")) {
        toast.error(`⚠️ Warning: ${url} is Unsafe!`, {
          position: "top-right",
          autoClose: 5000,
        });
      } else if (verdict.includes("safe")) {
        toast.success(`✅ ${url} is Safe!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.info(`⏳ ${url} analysis is Pending...`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error checking website:", error);
      setResult({
        success: false,
        url,
        verdict: "Error",
        details: "Backend not reachable",
      });
      toast.error("❌ Error connecting to backend.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
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

        {loading && <p>🔄 Checking website...</p>}

        {result && (
          <div className="result-card">
            <h3>Result</h3>
            <p><strong>URL:</strong> {result.url || "N/A"}</p>

            {/* ✅ Verdict with correct badge */}
            <p>
              <strong>Verdict:</strong>{" "}
              <span
                className={
                  (result.verdict || "").toLowerCase().includes("unsafe")
                    ? "badge badge-unsafe"
                    : (result.verdict || "").toLowerCase().includes("safe")
                    ? "badge badge-safe"
                    : "badge badge-pending"
                }
              >
                {result.verdict || "No verdict yet"}
              </span>
            </p>

            {result.details && typeof result.details === "object" ? (
              <div>
                <p><strong>Malicious:</strong> {result.details.malicious ?? 0}</p>
                <p><strong>Suspicious:</strong> {result.details.suspicious ?? 0}</p>
                <p><strong>Undetected:</strong> {result.details.undetected ?? 0}</p>
              </div>
            ) : (
              <p><strong>Details:</strong> {result.details || "No details available"}</p>
            )}
          </div>
        )}
      </div>

      <ToastContainer />
      {result && (
        <pre style={{ background: "#f4f4f4", padding: "10px", marginTop: "10px" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}

export default Home;