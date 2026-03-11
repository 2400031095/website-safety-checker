const fetch = require("node-fetch");

(async () => {
  const response = await fetch("http://localhost:8080/api/check-website", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: "youtube.com" })
  });
  const data = await response.json();
  console.log("Response:", data);
})();