
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label, sensor }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;

    const unitMap = {
      temperature: "°C",
      humidity: "%",
      soil: "%",
      light: "lux",
      gas: "%",
    };

    return (
      <div
        style={{
          background: "rgba(0, 0, 0, 0.75)",
          color: "#fff",
          padding: "10px 14px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
          fontSize: "0.9rem",
        }}
      >
        <p style={{ margin: 0, fontWeight: 600 }}>Time: {label}</p>
        <p style={{ margin: 0 }}>
          {sensor.charAt(0).toUpperCase() + sensor.slice(1)}:{" "}
          {Number.isFinite(value) ? value.toFixed(2) : value}{" "}
          {unitMap[sensor] || ""}
        </p>
      </div>
    );
  }
  return null;
};

export default function LiveChart({ data, sensor }) {
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsUpdating(true);
    const timeout = setTimeout(() => setIsUpdating(false), 1200);
    return () => clearTimeout(timeout);
  }, [data.length]);

  const colorMap = {
    temperature: "#f97316",
    humidity: "#3b82f6",
    soil: "#22c55e",
    light: "#eab308",
    gas: "#ef4444",
  };

  const color = colorMap[sensor] || "#8884d8";
  
  
  const yAxisRange = {
  temperature: [0, 50],
  humidity: [0, 100],
  soil: [0, 100],
  light: [0, 2000],
  gas: [0, 100],
};

const yAxisTicks = {
  temperature: [0, 10, 20, 30, 40, 50],
  humidity: [0, 20, 40, 60, 80, 100],
  soil: [0, 20, 40, 60, 80, 100],
  light: [0, 500, 1000, 1500, 2000],
  gas: [0, 20, 40, 60, 80, 100],
};
  return (
    <div
      className="p-4 bg-white rounded-2xl shadow-xl mt-6"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "280px",
      }}
    >
      {/* ✅ Aspect Ratio Wrapper Added */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",   // <<--- ONLY CHANGE
          maxHeight: "380px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id={`color-${sensor}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="timestamp"
              tick={{ fill: "#ffffff", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
              tickMargin={8}
              interval={20}
              height={40}
            />

            <YAxis
                        domain={[
              yAxisTicks[sensor][0],
              yAxisTicks[sensor][yAxisTicks[sensor].length - 1],
            ]}
            ticks={yAxisTicks[sensor]}
              tick={{ fill: "#ffffff", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={36}
            />

            <Tooltip content={<CustomTooltip sensor={sensor} />} />

            <Area
              type="monotone"
              dataKey={sensor}
              stroke={color}
              fillOpacity={1}
              fill={`url(#color-${sensor})`}
              strokeWidth={2}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-in-out"
              dot={({ cx, cy, index }) => {
                const isLastPoint = index === data.length - 1;
                if (!isLastPoint) return null;

                return (
                  <>
                    <style>{`
                      @keyframes pulseRing {
                        0% { r: 6; opacity: 1; }
                        50% { r: 11; opacity: 0.5; }
                        100% { r: 6; opacity: 1; }
                      }
                    `}</style>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill={color}
                      stroke="#fff"
                      strokeWidth={2}
                      style={{
                        filter: `drop-shadow(0 0 6px ${color})`,
                        animation: isUpdating ? "pulseRing 1s ease-out" : "none",
                      }}
                    />
                  </>
                );
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
