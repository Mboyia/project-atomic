import React, { useState } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setError("");
    setConverted("");

    try {
      const apiKey = "22de5f9ba177ef622c4fa4fc";
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/KES/HUF/${amount}`
      );
      const result = response.data.conversion_result;
      setConverted(result.toFixed(2));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch exchange rate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        fontFamily: "Arial",
        padding: "2rem",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#222",
          borderRadius: "1rem",
          padding: "1.5rem",
          maxWidth: "400px",
          margin: "0 auto",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* From */}
        <div>
          <label>From</label>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "1.5rem",
              marginBottom: "1rem",
              borderBottom: "1px solid #333",
              paddingBottom: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://flagcdn.com/w40/ke.png"
                alt="KES"
                style={{ height: "24px", marginRight: "0.5rem" }}
              />
              <span>KES</span>
            </div>
            <input
              type="number"
              placeholder="10,000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                textAlign: "right",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* To */}
        <div>
          <label>To</label>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
              borderBottom: "1px solid #333",
              paddingBottom: "0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://flagcdn.com/w40/hu.png"
                alt="HUF"
                style={{ height: "24px", marginRight: "0.5rem" }}
              />
              <span>HUF</span>
            </div>
            <span>{loading ? "..." : converted || "0.00"}</span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "tomato", fontSize: "0.9rem" }}>{error}</p>
        )}

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "1rem",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            width: "100%",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
        >
          Convert
        </button>

        {/* Send via M-PESA (visual only for now) */}
        <button
          style={{
            backgroundColor: "#0a5f22",
            color: "#fff",
            border: "none",
            padding: "1rem",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            width: "100%",
            marginBottom: "1rem",
            cursor: "not-allowed",
            opacity: 0.8,
          }}
          disabled
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/M-PESA_LOGO-01.svg"
            alt="M-PESA"
            style={{
              height: "16px",
              verticalAlign: "middle",
              marginRight: "0.5rem",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          Send via M-Pesa
        </button>

        {/* Payout Method */}
        <div
          style={{
            backgroundColor: "#000",
            padding: "1rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <label style={{ opacity: 0.6 }}>Payout Method</label>
          <div style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
            SEPA Bank Transfer
          </div>
        </div>

        {/* Continue */}
        <button
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "1rem",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default App;
