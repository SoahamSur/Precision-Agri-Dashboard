// import React from "react";
// import useSensorData from "./hooks/useSensorData";
// import "./Dashboard.css";

// const thresholds = {
//   temperature: { min: 5, max: 40 },
//   humidity: { min: 20, max: 80 },
//   soil: { min: 10, max: 70 },
//   light: { min: 10, max: 2000 },
//   gas: { min: 0, max: 200 },
// };

// const icons = {
//   temperature: "🌡️",
//   humidity: "💧",
//   soil: "🌱",
//   light: "☀️",
//   gas: "🏭",
// };

// export default function Dashboard() {
//   const latest = useSensorData();

//   if (!latest)
//     return (
//       <p style={{ textAlign: "center", marginTop: "2rem", color: "#fff" }}>
//         Loading sensor data...
//       </p>
//     );

//   const sensors = [
//     {
//       key: "temperature",
//       label: "Temperature",
//       value: latest?.temperature?.value ?? null,
//       unit: "°C",
//       status: latest?.temperature?.status ?? "",
//     },
//     {
//       key: "humidity",
//       label: "Humidity",
//       value: latest?.humidity?.value ?? null,
//       unit: "%",
//       status: latest?.humidity?.status ?? "",
//     },
//     {
//       key: "soil",
//       label: "Soil Moisture",
//       value: latest?.soil?.percent ?? null,
//       unit: "%",
//       status: latest?.soil?.status ?? "",
//     },
//     {
//       key: "light",
//       label: "Light Intensity",
//       value: latest?.light?.lux ?? null,
//       unit: "lux",
//       status: latest?.light?.status ?? "",
//     },
//     {
//       key: "gas",
//       label: "Air Quality",
//       value: latest?.gas?.percent ?? null,
//       unit: "%",
//       status: latest?.gas?.status ?? "",
//     },
//   ];

//   return (
//     <div className="dashboard">
//       <header>
//         <h1>🌿 Precision Agri Rover Dashboard</h1>
//         <p>Real-time sensor monitoring</p>
//       </header>

//       <div className="cards-container">
//         {sensors.map((sensor) => {
//           const val =
//             sensor.value !== null && sensor.value !== undefined
//               ? Number(sensor.value)
//               : null;

//           const isAlert =
//             val !== null &&
//             (val < thresholds[sensor.key].min ||
//               val > thresholds[sensor.key].max);

//           return (
//             <div
//               key={sensor.key}
//               className={`sensor-card ${isAlert ? "alert" : ""}`}
//             >
//               <div className="sensor-icon">{icons[sensor.key]}</div>
//               <h2>{sensor.label}</h2>
//               <p className="sensor-value">
//                 {val !== null && !isNaN(val) ? `${val} ${sensor.unit}` : "—"}
//               </p>
//               <p className="sensor-status">{sensor.status}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import useSensorData from "./hooks/useSensorData";
// import "./Dashboard.css";

// const thresholds = {
//   temperature: { min: 5, max: 40 },
//   humidity: { min: 20, max: 80 },
//   soil: { min: 10, max: 70 },
//   light: { min: 10, max: 2000 },
//   gas: { min: 0, max: 200 },
// };

// const icons = {
//   temperature: "🌡️",
//   humidity: "💧",
//   soil: "🌱",
//   light: "☀️",
//   gas: "🏭",
// };

// export default function Dashboard() {
//   const latest = useSensorData();

//   // If data not ready
//   if (!latest)
//     return (
//      <p
//   style={{
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     fontSize: "2rem",
//     fontWeight: "600",
//     color: "#e0e0e0",
//     backgroundColor: "#0b0b0b",
//     letterSpacing: "1px",
//     textShadow: "0 0 10px rgba(255,255,255,0.2)",
//     margin: 0,
//   }}
// >
//   Loading sensor data...
// </p>

//     );

//   // Safely extract sensor data
//   const sensors = [
//     {
//       key: "temperature",
//       label: "Temperature",
//       value:
//         latest?.temperature?.value ??
//         latest?.dht?.temperature ??
//         null,
//       unit: "°C",
//       status: latest?.temperature?.status ?? "Unknown",
//     },
//     {
//       key: "humidity",
//       label: "Humidity",
//       value:
//         latest?.humidity?.value ??
//         latest?.dht?.humidity ??
//         null,
//       unit: "%",
//       status: latest?.humidity?.status ?? "Unknown",
//     },
//     {
//       key: "soil",
//       label: "Soil Moisture",
//       value: latest?.soil?.percent ?? null,
//       unit: "%",
//       status: latest?.soil?.status ?? "Unknown",
//     },
//     {
//       key: "light",
//       label: "Light Intensity",
//       value: latest?.light?.lux ?? null,
//       unit: "lux",
//       status: latest?.light?.status ?? "Unknown",
//     },
//     {
//       key: "gas",
//       label: "Air Quality",
//       value: latest?.gas?.percent ?? null,
//       unit: "%",
//       status: latest?.gas?.status ?? "Unknown",
//     },
//   ];

//   // Debug log to see live updates
//   console.log("🚀 Rendering Dashboard with latest:", latest);

//   return (
//     <div className="dashboard">
//       <header>
//         <h1>🌿 Precision Agri Dashboard</h1>
//         <p>
//           Real-time sensor monitoring <span className="live-dot"></span>
//         </p>
//       </header>

//       <div className="cards-container">
//         {sensors.map((sensor) => {
//           const val =
//             sensor.value !== null && sensor.value !== undefined
//               ? Number(sensor.value)
//               : null;

//           const isAlert =
//             val !== null &&
//             (val < thresholds[sensor.key].min ||
//               val > thresholds[sensor.key].max);
// return (
//   <div
//     key={sensor.key}
//     className={`sensor-card ${isAlert ? "alert" : ""}`}
//   >
//     <div className="sensor-icon">{icons[sensor.key]}</div>
//     <h2 className="sensor-label">{sensor.label}</h2>
//    <p className="sensor-value">
//   {val || val === 0 ? `${val} ${sensor.unit}` : "—"}
// </p>
//     <p className="sensor-status">{sensor.status}</p>
//   </div>
// );

//         })}
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import useSensorData from "./hooks/useSensorData";
// import "./Dashboard.css";

// const thresholds = {
//   temperature: { min: 5, max: 40 },
//   humidity: { min: 20, max: 80 },
//   soil: { min: 10, max: 70 },
//   light: { min: 10, max: 2000 },
//   gas: { min: 0, max: 200 },
// };

// const icons = {
//   temperature: "🌡️",
//   humidity: "💧",
//   soil: "🌱",
//   light: "☀️",
//   gas: "🏭",
// };

// function isPlausibleEpochMs(n) {
//   return typeof n === "number" && n > 1e11 && n < 2e12;
// }

// export default function Dashboard() {
//   const latest = useSensorData();

//   if (!latest)
//     return (
//       <p
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           fontSize: "2rem",
//           fontWeight: "600",
//           color: "#e0e0e0",
//           backgroundColor: "#0b0b0b",
//           letterSpacing: "1px",
//           textShadow: "0 0 10px rgba(255,255,255,0.2)",
//           margin: 0,
//         }}
//       >
//         Loading sensor data...
//       </p>
//     );

//   const sensors = [
//     {
//       key: "temperature",
//       label: "Temperature",
//       value: latest?.temperature?.value ?? latest?.dht?.temperature ?? null,
//       unit: "°C",
//       status: latest?.temperature?.status ?? "Unknown",
//     },
//     {
//       key: "humidity",
//       label: "Humidity",
//       value: latest?.humidity?.value ?? latest?.dht?.humidity ?? null,
//       unit: "%",
//       status: latest?.humidity?.status ?? "Unknown",
//     },
//     {
//       key: "soil",
//       label: "Soil Moisture",
//       value: latest?.soil?.percent ?? null,
//       unit: "%",
//       status: latest?.soil?.status ?? "Unknown",
//     },
//     {
//       key: "light",
//       label: "Light Intensity",
//       value: latest?.light?.lux ?? null,
//       unit: "lux",
//       status: latest?.light?.status ?? "Unknown",
//     },
//     {
//       key: "gas",
//       label: "AQI",
//       value: latest?.gas?.percent ?? null,
//       unit: "",
//       status: latest?.gas?.status ?? "Unknown",
//     },
//   ];

//   // Determine lastUpdated:
//   // Prefer rawTimestamp if it looks like a real epoch in ms,
//   // else use receivedAt (client receive time).
//   let lastUpdatedText = "Not available";
//   if (isPlausibleEpochMs(latest?.rawTimestamp)) {
//     lastUpdatedText = new Date(latest.rawTimestamp).toLocaleString();
//   } else if (latest?.rawTimestamp) {
//     // If rawTimestamp exists but is small (likely seconds or device-relative),
//     // try to detect seconds -> convert to ms if value looks like seconds (10 digits)
//     const tsStr = String(latest.rawTimestamp);
//     if (tsStr.length === 10) {
//       // treat as seconds
//       lastUpdatedText = new Date(Number(tsStr) * 1000).toLocaleString();
//     } else {
//       // fallback: use client receive time
//       lastUpdatedText = latest?.receivedAt
//         ? new Date(latest.receivedAt).toLocaleString()
//         : "Not available";
//     }
//   } else if (latest?.receivedAt) {
//     lastUpdatedText = new Date(latest.receivedAt).toLocaleString();
//   }

//   console.log("🚀 Rendering Dashboard with latest:", latest);

//   return (
//     <div className="dashboard">
//       <header>
//         <h1>🌿 Precision Agri Dashboard</h1>
//         <p>
//           Real-time sensor monitoring <span className="live-dot"></span>
//         </p>

//         <p
//           style={{
//             fontSize: "1rem",
//             color: "#ccc",
//             marginTop: "0.5rem",
            
//           }} 
//           className="last-updated"
//         >
//           Last updated:{" "}
//           <span style={{ color: "#fff", fontWeight: "500" }}>
//             {lastUpdatedText}
//           </span>
//         </p>
//       </header>

//       <div className="cards-container">
//         {sensors.map((sensor) => {
//           const val =
//             sensor.value !== null && sensor.value !== undefined
//               ? Number(sensor.value)
//               : null;

//           const isAlert =
//             val !== null &&
//             (val < thresholds[sensor.key].min ||
//               val > thresholds[sensor.key].max);

//           return (
//             <div
//               key={sensor.key}
//               className={`sensor-card ${isAlert ? "alert" : ""}`}
//             >
//               <div className="sensor-icon">{icons[sensor.key]}</div>
//               <h2 className="sensor-label">{sensor.label}</h2>
//               <p className="sensor-value">
//                 {val || val === 0 ? `${val} ${sensor.unit}` : "—"}
//               </p>
//               <p className="sensor-status">{sensor.status}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React from "react";
import useSensorData from "./hooks/useSensorData";
import "./Dashboard.css";

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

  // Helper to format numbers with 2 decimals
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

  // Determine lastUpdated:
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
