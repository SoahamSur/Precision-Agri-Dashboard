// import { useEffect, useState } from "react";
// import { ref, onValue } from "firebase/database";
// import { database } from "../firebase";

// export default function useSensorData() {
//   const [latestReading, setLatestReading] = useState(null);

//   useEffect(() => {
//     const dbRef = ref(database, "readings");

//     const unsubscribe = onValue(dbRef, (snapshot) => {
//       const val = snapshot.val();
//       if (!val) {
//         setLatestReading(null);
//         return;
//       }

//       const readingsArray = Object.values(val).filter(
//         (r) => r && typeof r === "object"
//       );

//       const latest = [...readingsArray].reverse().find(
//         (r) =>
//           r.temperature &&
//           r.humidity &&
//           r.soil &&
//           r.light &&
//           r.gas
//       );

//       console.log("🔥 Latest reading updated:", latest);
//       setLatestReading(latest || null);
//     });

//     // ✅ Clean up listener on unmount
//     return () => unsubscribe();
//   }, []);

//   return latestReading;
// }



// import { useEffect, useState } from "react";
// import { ref, query, limitToLast, onValue } from "firebase/database";
// import { database } from "../firebase";

// export default function useSensorData() {
//   const [latestReading, setLatestReading] = useState(null);

//   useEffect(() => {
//     const q = query(ref(database, "readings"), limitToLast(1));

//     const unsubscribe = onValue(q, (snapshot) => {
//       const val = snapshot.val();
//       if (!val) return setLatestReading(null);

//       const latest = Object.values(val)[0];

//       // 🧠 Normalize structure so dashboard can use consistent keys
//       const parsed = {
//         temperature: {
//           value: latest?.dht?.temperature ?? latest?.temperature?.value ?? null,
//           status: "Normal",
//         },
//         humidity: {
//           value: latest?.dht?.humidity ?? latest?.humidity?.value ?? null,
//           status: "Normal",
//         },
//         soil: {
//           percent: latest?.soil?.percent ?? latest?.soil ?? null,
//           status: latest?.soil?.status ?? "Unknown",
//         },
//         light: {
//           lux: latest?.light?.lux ?? latest?.light ?? null,
//           status: latest?.light?.status ?? "Unknown",
//         },
//         gas: {
//           percent: latest?.gas?.percent ?? latest?.gas ?? null,
//           status: latest?.gas?.status ?? "Unknown",
//         },
//         timestamp: latest?.timestamp ?? null,
//       };

//       console.log("🔥 Parsed live update:", parsed);
//       setLatestReading(parsed);
//     });

//     return () => unsubscribe();
//   }, []);

//   return latestReading;
// }


import { useEffect, useState } from "react";
import { ref, query, limitToLast, onValue } from "firebase/database";
import { database } from "../firebase";

function isPlausibleEpochMs(n) {
  // plausible epoch in milliseconds (>= 2009 and <= year 2035 roughly)
  return typeof n === "number" && n > 1e11 && n < 2e12;
}

export default function useSensorData() {
  const [latestReading, setLatestReading] = useState(null);

  useEffect(() => {
    const readingsRef = query(ref(database, "readings"), limitToLast(1));

    const unsubscribe = onValue(readingsRef, (snapshot) => {
      const val = snapshot.val();
      if (!val) return setLatestReading(null);

      const latest = Object.values(val)[0];

      // Normalize to match dashboard keys
      const parsed = {
        temperature: {
          value: latest?.temperature?.value ?? latest?.dht?.temperature ?? null,
          status: latest?.temperature?.status ?? latest?.dht?.tempStatus ?? "Unknown",
        },
        humidity: {
          value: latest?.humidity?.value ?? latest?.dht?.humidity ?? null,
          status: latest?.humidity?.status ?? latest?.dht?.humidityStatus ?? "Unknown",
        },
        soil: {
          percent: latest?.soil?.percent ?? null,
          status: latest?.soil?.status ?? "Unknown",
        },
        light: {
          lux: latest?.light?.lux ?? null,
          status: latest?.light?.status ?? "Unknown",
        },
        gas: {
          percent: latest?.gas?.percent ?? null,
          status: latest?.gas?.status ?? "Unknown",
        },
        // raw timestamp as received from Firebase (if any)
        rawTimestamp: latest?.timestamp ?? null,
        // timestamp when this client received the update
        receivedAt: Date.now(),
      };

      // Force fresh object for react
      setLatestReading(JSON.parse(JSON.stringify(parsed)));
      console.log("🔥 Latest live reading (parsed):", parsed);
    });

    return () => unsubscribe();
  }, []);

  return latestReading;
}
