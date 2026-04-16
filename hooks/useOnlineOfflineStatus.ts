import { useEffect, useState } from "react";

export const useOnlineOfflineStatus = () => {
  const [online, setOnline] = useState(
    typeof window !== "undefined" ? navigator.onLine : true,
  );
  const onOnline = () => setOnline(true);
  const onOffline = () => setOnline(false);

  useEffect(() => {
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  return {
    isOnline: online,
  };
};
