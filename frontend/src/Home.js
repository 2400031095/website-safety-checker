function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [attack, setAttack] = useState("");

  const attacks = [
    "Russia → USA",
    "China → Germany",
    "Brazil → UK",
    "India → Australia",
    "North Korea → Japan",
    "Iran → France"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const random = attacks[Math.floor(Math.random() * attacks.length)];
      setAttack(random);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const checkWebsite = async () => {
    setLoading(true);
    setResult(null);

    try {
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const response = await fetch(`${API_URL}/scan`, { ... });
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setResult(data);

      if (data.success) setHistory(prev => [url, ...prev.slice(0, 4)]);
    } catch {
      setResult({ success: false });
    }

    setLoading(false);
  };

  const riskScore = result ? (result.verdict === "Safe" ? 10 : 85) : 0;

  return (
    <>
      {/* SCANNER */}
      <div className="scanner-card">
        <h2>Website Security Scanner</h2>
        <div className="input-group">
          <input
            className="url-input"
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="scan-btn" onClick={checkWebsite}>
            Scan
          </button>
        </div>

        {loading && (
          <div className="scan-loader">
            <div className="radar"></div>
            <p>Scanning Website Security...</p>
            <div className="scan-progress">
              <div className="scan-bar"></div>
            </div>
          </div>
        )}

        {result && result.success && (
          <div className="result-card">
            <img
              src={`https://www.google.com/s2/favicons?domain=${url}&sz=64`}
              className="site-icon"
              alt=""
            />
            <h3>{url}</h3>
            <div
              className={`verdict ${
                result.verdict === "Safe" ? "safe" : "danger"
              }`}
            >
              {result.verdict}
            </div>
          </div>
        )}
      </div>

      {/* SCAN HISTORY */}
      <div className="history-card">
        <h2>Recent Scans</h2>
        <ul>
          {history.map((site, index) => (
            <li key={index}>{site}</li>
          ))}
        </ul>
      </div>

      {/* ATTACK PANEL */}
      <div className="attack-panel">
        <h2>Live Global Cyber Threat Activity</h2>
        <div className="attack-map">
          <div className="attack-line"></div>
          <p className="attack-text">Attack detected: {attack}</p>
        </div>
      </div>
    </>
  );
}

export default Home;
