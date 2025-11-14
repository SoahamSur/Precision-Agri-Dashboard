// import React, { useState } from "react";
// import useSensorData from "./hooks/useSensorData";
// import "./Dashboard.css";
// import LiveChart from "./components/LiveChart";
// import useSensorHistory from "./hooks/useSensorHistory";
// import { getDatabase, ref, query, orderByChild, startAt, get } from "firebase/database";

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
//   const [selectedRange, setSelectedRange] = useState("1h");
//   const [selectedSensor, setSelectedSensor] = useState("all");
//   const history = useSensorHistory(100); // last 50 readings


//   const getRangeMs = (key) => {
//     const map = {
//       "1h": 1 * 60 * 60 * 1000,
//       "12h": 12 * 60 * 60 * 1000,
//       "1d": 24 * 60 * 60 * 1000,
//       "2d": 2 * 24 * 60 * 60 * 1000,
//       "1m": 30 * 24 * 60 * 60 * 1000,
//       "2m": 60 * 24 * 60 * 60 * 1000,
//     };
//     return map[key] ?? map["1h"];
//   };

//   // ---------------- FILTERED CSV DOWNLOAD FUNCTION ----------------
//  // ---------------- FILTERED CSV DOWNLOAD FUNCTION ----------------
// const downloadFilteredCSV = async () => {
//   const db = getDatabase();
//   const now = Date.now();
//   const startTime = now - getRangeMs(selectedRange);

//   try {
//     const readingsRef = query(
//       ref(db, "readings"),
//       orderByChild("timestamp"),
//       startAt(startTime / 1000)
//     );

//     const snapshot = await get(readingsRef);
//     if (!snapshot.exists()) {
//       alert("No readings found for selected range.");
//       return;
//     }

//     const data = snapshot.val();
//     const entries = Object.values(data);

//     if (!entries.length) {
//       alert("No data found in the selected range.");
//       return;
//     }

//     let headers = ["Timestamp"];
//     if (selectedSensor === "all") {
//       headers.push(
//         "Temperature (°C)",
//         "Humidity (%)",
//         "Soil Moisture (%)",
//         "Gas (%)",
//         "Light (lux)"
//       );
//     } else {
//       const labelMap = {
//         temperature: "Temperature (°C)",
//         humidity: "Humidity (%)",
//         soil: "Soil Moisture (%)",
//         gas: "Gas (%)",
//         light: "Light (lux)",
//       };
//       headers.push(labelMap[selectedSensor]);
//     }
// const csvRows = [headers];
// for (const v of entries) {
//   // ✅ Convert timestamp to IST
//   let formattedTime = new Date(v.timestamp * 1000).toLocaleString("en-IN", {
//     timeZone: "Asia/Kolkata",
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });

//   // ✅ Replace comma with space to prevent CSV column split
//   formattedTime = formattedTime.replace(",", "");

//   let row = [formattedTime];
//   if (selectedSensor === "all") {
//     row.push(
//       v.temperature?.value ?? "",
//       v.humidity?.value ?? "",
//       v.soil?.percent ?? "",
//       v.gas?.percent ?? "",
//       v.light?.lux ?? ""
//     );
//   } else {
//     const map = {
//       temperature: v.temperature?.value ?? "",
//       humidity: v.humidity?.value ?? "",
//       soil: v.soil?.percent ?? "",
//       gas: v.gas?.percent ?? "",
//       light: v.light?.lux ?? "",
//     };
//     row.push(map[selectedSensor]);
//   }
//   csvRows.push(row);
// }


//     const csvString = csvRows.map((r) => r.join(",")).join("\n");
//     const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;

//     const fileName =
//       selectedSensor === "all"
//         ? `SensorData_${selectedRange}.csv`
//         : `${selectedSensor}_${selectedRange}.csv`;

//     link.setAttribute("download", fileName);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   } catch (err) {
//     console.error("❌ Error generating filtered CSV:", err);
//     alert("Error generating CSV. Check console for details.");
//   }
// };


//   // ---------------- LOADING SCREEN ----------------
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

//   const formatValue = (val) => {
//     if (val === null || val === undefined || isNaN(val)) return "—";
//     return parseFloat(val).toFixed(2);
//   };

//   const sensors = [
//     { key: "temperature", label: "Temperature", value: latest?.temperature?.value ?? null, unit: "°C", status: latest?.temperature?.status ?? "Unknown" },
//     { key: "humidity", label: "Humidity", value: latest?.humidity?.value ?? null, unit: "%", status: latest?.humidity?.status ?? "Unknown" },
//     { key: "soil", label: "Soil Moisture", value: latest?.soil?.percent ?? null, unit: "%", status: latest?.soil?.status ?? "Unknown" },
//     { key: "light", label: "Light Intensity", value: latest?.light?.lux ?? null, unit: "lux", status: latest?.light?.status ?? "Unknown" },
//     { key: "gas", label: "Air Quality", value: latest?.gas?.percent ?? null, unit: "", status: latest?.gas?.status ?? "Unknown" },
//   ];

//   let lastUpdatedText = "Not available";
//   if (isPlausibleEpochMs(latest?.rawTimestamp)) {
//     lastUpdatedText = new Date(latest.rawTimestamp).toLocaleString();
//   } else if (latest?.rawTimestamp) {
//     const tsStr = String(latest.rawTimestamp);
//     if (tsStr.length === 10) {
//       lastUpdatedText = new Date(Number(tsStr) * 1000).toLocaleString();
//     } else {
//       lastUpdatedText = latest?.receivedAt ? new Date(latest.receivedAt).toLocaleString() : "Not available";
//     }
//   } else if (latest?.receivedAt) {
//     lastUpdatedText = new Date(latest.receivedAt).toLocaleString();
//   }

//   // ---------------- MAIN RETURN ----------------
//   return (
//     <div className="dashboard">
//       <header>
//         <h1>🌿 Precision Agri Dashboard</h1>
//         <p>Real-time sensor monitoring <span className="live-dot"></span></p>

//         {/* Last Updated */}
//         <div className="last-updated">
//           ⏱️ Last updated:{" "}
//           <span style={{ color: "#fff", fontWeight: "500" }}>{lastUpdatedText}</span>
//         </div>

//         {/* Centered Filter + Download Section */}
//         <div className="filter-container">
//           <div className="select-wrapper">
//           <select
//             className="filter-select"
//             value={selectedRange}
//             onChange={(e) => setSelectedRange(e.target.value)}
//           >
//             <option value="1h">Last 1 Hour</option>
//             <option value="12h">Last 12 Hours</option>
//             <option value="1d">Last 1 Day</option>
//             <option value="2d">Last 2 Days</option>
//             <option value="1m">Last 1 Month</option>
//             <option value="2m">Last 2 Months</option>

//           </select>
//             <img
//                 src="https://img.icons8.com/?size=100&id=2760&format=png&color=FFFFFF"
//                 alt="▼"
//                 className="dropdown-icon"
//              />
//           </div>

// <div className="select-wrapper">
//           <select
//             className="filter-select"
//             style={{paddingRight:"42px"}}
//             value={selectedSensor}
//             onChange={(e) => setSelectedSensor(e.target.value)}
//           >
//             <option value="all">All Parameters</option>
//             <option value="temperature">Temperature</option>
//             <option value="humidity">Humidity</option>
//             <option value="soil">Soil Moisture</option>
//             <option value="light">Light Intensity</option>
//             <option value="gas">Air Quality</option>
//           </select>
//             <img
//     src="https://img.icons8.com/?size=100&id=2760&format=png&color=FFFFFF"
//     alt="▼"
//     className="dropdown-icon"
//   />
//           </div>

//           <button className="download-btn" onClick={downloadFilteredCSV}>
//             📥 Download CSV
//           </button>
//         </div>
//       </header>

//       {/* Sensor Cards */}
//       <div className="cards-container">
//         {sensors.map((sensor) => {
//           const val = sensor.value !== null && sensor.value !== undefined ? Number(sensor.value) : null;
//           const isAlert = val !== null && (val < thresholds[sensor.key].min || val > thresholds[sensor.key].max);
//           return (
//             <div key={sensor.key} className={`sensor-card ${isAlert ? "alert" : ""}`}>
//               <div className="sensor-icon">{icons[sensor.key]}</div>
//               <h2 className="sensor-label">{sensor.label}</h2>
//               <p className="sensor-value">
//                 {val || val === 0 ? `${formatValue(val)} ${sensor.unit}` : "—"}
//               </p>
//               <p className="sensor-status">{sensor.status}</p>
//             </div>
//           );
//         })}
//       </div>
//       <div className="charts-container">
//   <LiveChart data={history} sensor="temperature" />
//   <LiveChart data={history} sensor="humidity" />
//   <LiveChart data={history} sensor="soil" />
//   <LiveChart data={history} sensor="light" />
//   <LiveChart data={history} sensor="gas" />
// </div>

//     </div>
//   );
// }
import React, { useState,useEffect } from "react";
import useSensorData from "./hooks/useSensorData";
import useSensorHistory from "./hooks/useSensorHistory";
import LiveChart from "./components/LiveChart";
import { getDatabase, ref,onValue, query, orderByChild, startAt, get } from "firebase/database";
import "./Dashboard.css";
import AdvisoryFAB from "./components/AdvisoryFAB/AdvisoryFAB";
import { database } from "./firebase"; // adjust path if needed


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
  const history = useSensorHistory(120);
  const [selectedRange, setSelectedRange] = useState("1h");
  const [selectedSensor, setSelectedSensor] = useState("all");
  const [advisory, setAdvisory] = useState("");
  const handleAdvisoryReceived = (msg) => {
    setAdvisory(msg);   // store only the latest
  };

  const [latestAdvisory, setLatestAdvisory] = useState("No new advisories");

useEffect(() => {
  const advisoryRef = ref(database, "advisory/latest");

  const unsubscribe = onValue(advisoryRef, (snapshot) => {
    const data = snapshot.val();
    if (data && data.message) {
      setLatestAdvisory(data.message);
    }
  });

  return () => unsubscribe();
}, []);




  const getRangeMs = (key) => {
    const map = {
      "1h": 1 * 60 * 60 * 1000,
      "12h": 12 * 60 * 60 * 1000,
      "1d": 24 * 60 * 60 * 1000,
      "2d": 2 * 24 * 60 * 60 * 1000,
      "1m": 30 * 24 * 60 * 60 * 1000,
      "2m": 60 * 24 * 60 * 60 * 1000,
    };
    return map[key] ?? map["1h"];
  };

  // ✅ CSV download function (unchanged)
  const downloadFilteredCSV = async () => {
    const db = getDatabase();
    const now = Date.now();
    const startTime = now - getRangeMs(selectedRange);
    try {
      const readingsRef = query(
        ref(db, "readings"),
        orderByChild("timestamp"),
        startAt(startTime / 1000)
      );
      const snapshot = await get(readingsRef);
      if (!snapshot.exists()) {
        alert("No readings found for selected range.");
        return;
      }
      const data = snapshot.val();
      const entries = Object.values(data);
      if (!entries.length) {
        alert("No data found in the selected range.");
        return;
      }
      let headers = ["Timestamp"];
      if (selectedSensor === "all") {
        headers.push("Temperature (°C)", "Humidity (%)", "Soil Moisture (%)", "Gas (%)", "Light (lux)");
      } else {
        const labelMap = {
          temperature: "Temperature (°C)",
          humidity: "Humidity (%)",
          soil: "Soil Moisture (%)",
          gas: "Gas (%)",
          light: "Light (lux)",
        };
        headers.push(labelMap[selectedSensor]);
      }
      const csvRows = [headers];
      for (const v of entries) {
        let formattedTime = new Date(v.timestamp * 1000).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        formattedTime = formattedTime.replace(",", "");
        let row = [formattedTime];
        if (selectedSensor === "all") {
          row.push(v.temperature?.value ?? "", v.humidity?.value ?? "", v.soil?.percent ?? "", v.gas?.percent ?? "", v.light?.lux ?? "");
        } else {
          const map = {
            temperature: v.temperature?.value ?? "",
            humidity: v.humidity?.value ?? "",
            soil: v.soil?.percent ?? "",
            gas: v.gas?.percent ?? "",
            light: v.light?.lux ?? "",
          };
          row.push(map[selectedSensor]);
        }
        csvRows.push(row);
      }
      const csvString = csvRows.map((r) => r.join(",")).join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName =
        selectedSensor === "all"
          ? `SensorData_${selectedRange}.csv`
          : `${selectedSensor}_${selectedRange}.csv`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("❌ Error generating filtered CSV:", err);
      alert("Error generating CSV. Check console for details.");
    }
  };

  if (!latest)
    return (
      <p  style={{
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
        }}>
        Loading sensor data...
      </p>
    );

  const formatValue = (val) => {
    if (val === null || val === undefined || isNaN(val)) return "—";
    return parseFloat(val).toFixed(2);
  };

  const sensors = [
    { key: "temperature", label: "Temperature", value: latest?.temperature?.value, unit: "°C", status: latest?.temperature?.status },
    { key: "humidity", label: "Humidity", value: latest?.humidity?.value, unit: "%", status: latest?.humidity?.status },
    { key: "soil", label: "Soil Moisture", value: latest?.soil?.percent, unit: "%", status: latest?.soil?.status },
    { key: "light", label: "Light Intensity", value: latest?.light?.lux, unit: "lux", status: latest?.light?.status },
    { key: "gas", label: "Air Quality", value: latest?.gas?.percent, unit: "", status: latest?.gas?.status },
  ];

    let lastUpdatedText = "Not available";
  if (isPlausibleEpochMs(latest?.rawTimestamp)) {
    lastUpdatedText = new Date(latest.rawTimestamp).toLocaleString();
  } else if (latest?.rawTimestamp) {
    const tsStr = String(latest.rawTimestamp);
    if (tsStr.length === 10) {
      lastUpdatedText = new Date(Number(tsStr) * 1000).toLocaleString();
    } else {
      lastUpdatedText = latest?.receivedAt ? new Date(latest.receivedAt).toLocaleString() : "Not available";
    }
  } else if (latest?.receivedAt) {
    lastUpdatedText = new Date(latest.receivedAt).toLocaleString();
  }

  return (
    <> 
    <div className="dashboard">
      <header>
        <h1>🌿 Precision Agri Dashboard</h1>
        <p>Real-time sensor monitoring <span className="live-dot"></span></p>

        <div className="last-updated">
          ⏱️ Last updated:{" "}
          <span style={{ color: "#fff", fontWeight: "500" }}>{lastUpdatedText}</span>
        </div>

        <div className="filter-container">
          <div className="select-wrapper">
            <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)} className="filter-select">
              <option value="1h">Last 1 Hour</option>
              <option value="12h">Last 12 Hours</option>
              <option value="1d">Last 1 Day</option>
              <option value="2d">Last 2 Days</option>
              <option value="1m">Last 1 Month</option>
              <option value="2m">Last 2 Months</option>
            </select>
             <img
                src="https://img.icons8.com/?size=100&id=2760&format=png&color=FFFFFF"
                alt="▼"
                className="dropdown-icon"
             />
          </div>

          <div className="select-wrapper">
            <select value={selectedSensor} onChange={(e) => setSelectedSensor(e.target.value)} className="filter-select" style={{padding:"10px 40px 10px 16px"}}>
              <option value="all">All Parameters</option>
              <option value="temperature">Temperature</option>
              <option value="humidity">Humidity</option>
              <option value="soil">Soil Moisture</option>
              <option value="light">Light Intensity</option>
              <option value="gas">Air Quality</option>
            </select>
            <img
                src="https://img.icons8.com/?size=100&id=2760&format=png&color=FFFFFF"
                alt="▼"
                className="dropdown-icon"
                style={{padding:"2px"}}
             />
          </div>

          <button className="download-btn" onClick={downloadFilteredCSV}>
            📥 Download CSV
          </button>
        </div>
<div className="advisory-display">
  🌱 Advisory: "{latestAdvisory}"
</div>

      </header>

      {/* Combined Cards + Chart */}
      {/* Combined Cards + Chart — Updated Layout */}
      <div className="chart-layout">
        {sensors.slice(0, 5).map((sensor) => {
          const val = sensor.value;
          const isAlert =
            val !== null &&
            (val < thresholds[sensor.key].min || val > thresholds[sensor.key].max);
          return (
            <div key={sensor.key} className={`chart-card ${isAlert ? "alert" : ""}`}>
              <div className="sensor-header" style={{display:"flex", justifyItems:'center', gap:'10px'}}>
                <div className="sensor-icon">{icons[sensor.key]}</div>
                <div>
                  <h2>{sensor.label}</h2>
                  <p className="sensor-value">
                    {val || val === 0 ? `${formatValue(val)} ${sensor.unit}` : "—"}
                  </p>
                  <p className="sensor-status">{sensor.status}</p>
                </div>
              </div>
              <div className="sensor-chart">
                <LiveChart data={history} sensor={sensor.key} compact />
              </div>
            </div>
          );
        })}
      </div>
    </div>
<AdvisoryFAB onAdvisory={handleAdvisoryReceived} />

     </>
  );
}
