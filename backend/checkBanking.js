// -------------------- Banking URL Checker --------------------

// List of trusted banking domains (you can expand this list)
const trustedBanks = [
  "hdfcbank.com",
  "icicibank.com",
  "sbi.co.in",
  "axisbank.com",
  "kotak.com",
  "yesbank.in"
];

// Function to check if a given URL belongs to a trusted bank or looks suspicious
function checkBankingURL(url) {
  try {
    const domain = new URL(url).hostname.toLowerCase();

    if (trustedBanks.includes(domain)) {
      return { status: "Trusted Bank", domain };
    } else if (domain.includes("bank")) {
      return { status: "Suspicious Banking Site", domain };
    }
    return { status: "General Website", domain };
  } catch (err) {
    return { status: "Error", details: err.message };
  }
}

module.exports = checkBankingURL;