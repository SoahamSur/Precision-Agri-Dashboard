import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

export default function useLatestSensorData() {
  const [latestData, setLatestData] = useState({
    temperature: 0,
    humidity: 0,
    soil: 0,
    light: 0,
    gas: 0,
  });

  useEffect(() => {
    const dataRef = ref(database, "readings"); // point to 'readings' node
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array and sort by key to get the latest reading
        const entries = Object.values(data);
        const lastEntry = entries[entries.length - 1]; // last entry
        if (lastEntry) {
          setLatestData({
            temperature: lastEntry.temperature || 0,
            humidity: lastEntry.humidity || 0,
            soil: lastEntry.soil || 0,
            light: lastEntry.light || 0,
            gas: lastEntry.gas || 0,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return latestData;
}
