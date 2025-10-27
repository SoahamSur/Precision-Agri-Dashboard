import React from "react";
import useSensorData from "./hooks/useSensorData";
import "./Dashboard.css";
import { getDatabase, ref, get } from "firebase/database";

const thresholds = {
  temperature: { min: 5, max: 40 },
  humidity: { min: 20, max: 80 },
  soil: { min: 10, max: 70 },
  light: { min: 10, max: 2000 },
  gas: { min: 0, max: 200 },
};

const icons = {
  temperature: "🌡️",
  humidity: "💧",
  soil: "🌱",
  light: "☀️",
  gas: "🏭",
};

function isPlausibleEpochMs(n) {
  return typeof n === "number" && n > 1e11 && n < 2e12;
}

export default function Dashboard() {
  const latest = useSensorData();

  // ---------------- CSV DOWNLOAD FUNCTION ----------------
  const downloadCSV = async () => {
    const db = getDatabase();
    const dataRef = ref(db, "readings"); // your Firebase node path

    try {
      const snapshot = await get(dataRef);
      if (!snapshot.exists()) {
        alert("No data found in Firebase!");
        return;
      }

      const data = snapshot.val();

      const csvRows = [
        [
          "Timestamp",
          "Temperature (°C)",
          "Humidity (%)",
          "Soil Moisture (%)",
          "Gas (%)",
          "Light (lux)",
        ],
      ];

      // Sort by timestamp (optional but nice)
      const sortedEntries = Object.entries(data).sort(
        (a, b) => (a[1].timestamp || 0) - (b[1].timestamp || 0)
      );

      for (const [_, values] of sortedEntries) {
        csvRows.push([
          new Date(values.timestamp * 1000).toLocaleString(),
          values.temperature?.value ?? "",
          values.humidity?.value ?? "",
          values.soil?.percent ?? "",
          values.gas?.percent ?? "",
          values.light?.lux ?? "",
        ]);
      }

      const csvString = csvRows.map((row) => row.join(",")).join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "SensorReadings.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating CSV:", error);
      alert("Error generating CSV. Check console for details.");
    }
  };

  // ---------------- LOADING SCREEN ----------------
  if (!latest)
    return (
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "2rem",
          fontWeight: "600",
          color: "#e0e0e0",
          backgroundColor: "#0b0b0b",
          letterSpacing: "1px",
          textShadow: "0 0 10px rgba(255,255,255,0.2)",
          margin: 0,
        }}
      >
        Loading sensor data...
      </p>
    );

  // ---------------- FORMAT SENSOR DATA ----------------
  const formatValue = (val) => {
    if (val === null || val === undefined || isNaN(val)) return "—";
    return parseFloat(val).toFixed(2);
  };

  const sensors = [
    {
      key: "temperature",
      label: "Temperature",
      value: latest?.temperature?.value ?? latest?.dht?.temperature ?? null,
      unit: "°C",
      status: latest?.temperature?.status ?? "Unknown",
    },
    {
      key: "humidity",
      label: "Humidity",
      value: latest?.humidity?.value ?? latest?.dht?.humidity ?? null,
      unit: "%",
      status: latest?.humidity?.status ?? "Unknown",
    },
    {
      key: "soil",
      label: "Soil Moisture",
      value: latest?.soil?.percent ?? null,
      unit: "%",
      status: latest?.soil?.status ?? "Unknown",
    },
    {
      key: "light",
      label: "Light Intensity",
      value: latest?.light?.lux ?? null,
      unit: "lux",
      status: latest?.light?.status ?? "Unknown",
    },
    {
      key: "gas",
      label: "AQI",
      value: latest?.gas?.percent ?? null,
      unit: "",
      status: latest?.gas?.status ?? "Unknown",
    },
  ];

  // ---------------- LAST UPDATED TIMESTAMP ----------------
  let lastUpdatedText = "Not available";
  if (isPlausibleEpochMs(latest?.rawTimestamp)) {
    lastUpdatedText = new Date(latest.rawTimestamp).toLocaleString();
  } else if (latest?.rawTimestamp) {
    const tsStr = String(latest.rawTimestamp);
    if (tsStr.length === 10) {
      lastUpdatedText = new Date(Number(tsStr) * 1000).toLocaleString();
    } else {
      lastUpdatedText = latest?.receivedAt
        ? new Date(latest.receivedAt).toLocaleString()
        : "Not available";
    }
  } else if (latest?.receivedAt) {
    lastUpdatedText = new Date(latest.receivedAt).toLocaleString();
  }

  console.log("🚀 Rendering Dashboard with latest:", latest);

  return (
    <div className="dashboard">
      <header>
        <h1>🌿 Precision Agri Dashboard</h1>
        <p>
          Real-time sensor monitoring <span className="live-dot"></span>
        </p>

        {/* Last Updated Section */}
        <p
          style={{
            fontSize: "1.1rem",
            marginTop: "0.8rem",
            color: "#e6e0e0ff",
            textShadow: "0 0 8px rgba(255,255,255,0.1)",
            letterSpacing: "0.5px",
            background: "rgba(29, 27, 27, 0.42)",
            padding: "8px 14px",
            borderRadius: "8px",
            display: "inline-block",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
          className="last-updated"
        >
          ⏱️ Last updated:{" "}
          <span style={{ color: "#fff", fontWeight: "500" }}>
            {lastUpdatedText}
          </span>
        </p>

        {/* 🟢 Download CSV Button */}
        <button
          onClick={downloadCSV}
          style={{
            marginTop: "15px",
            marginLeft: "16px", 
            backgroundColor: "#10b053ff",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            font:"poppins",
            fontWeight: "500",
            boxShadow: "0 0 10px rgba(46,139,87,0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "rgb(24, 96, 57)")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#10b053ff")
          }
        >
          📥 Download CSV
        </button>
      </header>

      <div className="cards-container">
        {sensors.map((sensor) => {
          const val =
            sensor.value !== null && sensor.value !== undefined
              ? Number(sensor.value)
              : null;

          const isAlert =
            val !== null &&
            (val < thresholds[sensor.key].min ||
              val > thresholds[sensor.key].max);

          return (
            <div
              key={sensor.key}
              className={`sensor-card ${isAlert ? "alert" : ""}`}
            >
              <div className="sensor-icon">{icons[sensor.key]}</div>
              <h2 className="sensor-label">{sensor.label}</h2>
              <p className="sensor-value">
                {val || val === 0 ? `${formatValue(val)} ${sensor.unit}` : "—"}
              </p>
              <p className="sensor-status">{sensor.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
