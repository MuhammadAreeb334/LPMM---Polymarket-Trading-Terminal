import React, { useEffect, useState } from "react";
import MarketCard from "../Components/MarketCard.jsx";
import { useSocket } from "../Context/SocketContext.jsx";
import { Loader } from "lucide-react";

const Dashboard = () => {
  const { socket, isConnected } = useSocket();
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!socket) return;

    const handleMarketsUpdate = (data) => {
      console.log("MARKETS_UPDATE:", data);

      if (data?.markets) {
        setMarkets((prevMarkets) => {
          const existingIds = new Set(prevMarkets.map((m) => m.condition_id));

          const newMarkets = data.markets.filter(
            (m) => !existingIds.has(m.condition_id),
          );

          return [...newMarkets, ...prevMarkets];
        });
      }
      setLoading(false);
    };

    socket.on("MARKETS_UPDATE", handleMarketsUpdate);

    return () => {
      socket.off("MARKETS_UPDATE", handleMarketsUpdate);
    };
  }, [socket]);

  return (
    <div className="min-h-screen p-4 md:p-8 rounded-lg relative">
      <div className="max-w-6xl mx-auto bg-white dark:bg-primary-dark transition-colors border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        {loading ? (
          <div className="flex flex-col justify-center items-center w-full h-[calc(95vh-200px)] text-center">
            <Loader className="animate-spin text-5xl mb-4 text-gray-500 dark:text-gray-300" />
            <p className="animate-pulse text-gray-500 dark:text-gray-300 text-lg font-medium">
              Loading order book...
            </p>
          </div>
        ) : (
          <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-md font-semibold">Enabled Markets</h1>
            <p className="text-gray-500 text-xs mt-1">
              Select a market to view order book
            </p>
          </div>
        )}
        <div className="flex flex-col max-h-[400px] overflow-y-auto [&::-webkit-scrollbar-track]:bg-transparent">
          <MarketCard markets={markets} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
