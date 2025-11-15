import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = ({ lastUpdated }) => {
  const [status, setStatus] = useState("Checking...");

useEffect(() => {
  const interval = setInterval(() => {
    if (!lastUpdated) {
      setStatus("Offline");
      return;
    }

    let last = Number(lastUpdated);

    // If timestamp was provided in SECONDS, convert to ms
    if (String(lastUpdated).length === 10) {
      last = last * 1000;
    }

    // Validate timestamp
    if (isNaN(last) || last < 1000000000000) {
      setStatus("Offline");
      return;
    }

    const diff = (Date.now() - last) / 1000;

    if (diff >= 10) setStatus("Offline");
    else setStatus("Online");

  }, 1000);

  return () => clearInterval(interval);
}, [lastUpdated]);


  return (
    <nav className="navbar">
      <div className="navbar-title">AgriMitra</div>

      <div
        className={`status-badge ${
          status === "Online" ? "online" : "offline"
        }`}
      >
        <span className={`status-dot ${status === "Online" ? "dot-online" : "dot-offline"}`}></span>
        {status}
      </div>
    </nav>
  );
};

export default Navbar;
