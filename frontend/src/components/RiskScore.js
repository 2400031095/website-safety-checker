// @ts-nocheck
import React from "react";

function RiskScore({ stats }) {
  if (!stats) return null;

  const total =
    (stats.harmless || 0) +
    (stats.malicious || 0) +
    (stats.suspicious || 0) +
    (stats.undetected || 0);

  const maliciousRatio = total > 0 ? stats.malicious / total : 0;

  const color =
    maliciousRatio < 0.3 ? "green" : maliciousRatio < 0.7 ? "orange" : "red";

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Risk Score: {Math.round(maliciousRatio * 100)}%</h4>
      <div
        style={{
          width: "100%",
          height: "20px",
          background: "#ddd",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            width: `${maliciousRatio * 100}%`,
            height: "100%",
            background: color,
            borderRadius: "5px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default RiskScore;