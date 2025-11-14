import { useEffect, useState } from "react";
import { ref, query, limitToLast, onValue } from "firebase/database";
import { database } from "../firebase";

export default function useSensorHistory(limit = 50) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const readingsRef = query(ref(database, "readings"), limitToLast(limit));

    const unsubscribe = onValue(readingsRef, (snapshot) => {
      const val = snapshot.val();
      if (!val) return setHistory([]);

      const entries = Object.values(val).map((item) => ({
        timestamp: new Date(item.timestamp * 1000).toLocaleTimeString("en-IN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        temperature: item?.temperature?.value ?? item?.dht?.temperature ?? null,
        humidity: item?.humidity?.value ?? item?.dht?.humidity ?? null,
        soil: item?.soil?.percent ?? null,
        light: item?.light?.lux ?? null,
        gas: item?.gas?.percent ?? null,
      }));

      setHistory(entries);
    });

    return () => unsubscribe();
  }, [limit]);

  return history;
}
