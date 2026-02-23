// import MarketData from "../assets/MarketData.js";
// import { FireAPI } from "../Hooks/useRequest.js";
import React, { useEffect, useState } from "react";
import MarketCard from "../Components/MarketCard";
import { useSocket } from "../Context/SocketContext.jsx";

const Dashboard = () => {
  // const MARKET_DATA = [
  //   {
  //     id: 1,
  //     question: "Will Jack Antonoff attend Taylor Swift's wedding?",
  //     probability: 88.5,
  //     date: "12/31/2026",
  //     min: 5,
  //     tags: ["Music", "NFL", "Taylor Swift"],
  //   },
  //   {
  //     id: 2,
  //     question: "Will Jared Goff attend Taylor Swift's wedding?",
  //     probability: 9.5,
  //     date: "12/31/2026",
  //     min: 5,
  //     tags: ["Music", "NFL", "Taylor Swift"],
  //   },
  //   {
  //     id: 3,
  //     question: "Will Lana Del Rey attend Taylor Swift's wedding?",
  //     probability: 57.5,
  //     date: "12/31/2026",
  //     min: 5,
  //     tags: ["Music", "NFL", "Taylor Swift"],
  //   },
  //   {
  //     id: 4,
  //     question: "Will Lana Del Rey attend Taylor Swift's wedding?",
  //     probability: 57.5,
  //     date: "12/31/2026",
  //     min: 5,
  //     tags: ["Music", "NFL", "Taylor Swift"],
  //   },
  //   {
  //     id: 5,
  //     question: "Will Lana Del Rey attend Taylor Swift's wedding?",
  //     probability: 57.5,
  //     date: "12/31/2026",
  //     min: 5,
  //     tags: ["Music", "NFL", "Taylor Swift"],
  //   },
  //   {
  //     id: 6,
  //     question: "Will Lana Del Rey attend Taylor Swift's wedding?",
  //     probability: 57.5,
  //     date: "12/31/2026",
  //     min: 5,
  //     tags: ["Music", "NFL", "Taylor Swift"],
  //   },
  //   {
  //     id: 7,
  //     question: "Will Lana Del Rey attend Taylor Swift's wedding?",
  //     probability: 57.5,
  //     date: "12/31/2026",
  //     min: 5,
  //     tags: ["Music", "NFL", "Taylor Swift"],
  //   },
  // ];

  const { socket, isConnected } = useSocket();
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     try {
  //       const data = await FireAPI("markets", "GET");
  //       setMarkets(data);
  //       console.log(data);
  //     } catch (err) {
  //       console.error("Error fetching initial markets:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchInitialData();
  // }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading markets...
      </div>
    );
  }
  return (
    <div className="min-h-screen p-4 md:p-8 rounded-lg relative">
      <div className="max-w-6xl mx-auto bg-white dark:bg-primary-dark transition-colors border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-md font-semibold">Enabled Markets</h1>
          <p className="text-gray-500 text-xs mt-1">
            Select a market to view order book
          </p>
        </div>
        <div className="flex flex-col max-h-[400px] overflow-y-auto [&::-webkit-scrollbar-track]:bg-transparent">
          {/* {markets.map((market, idx) => ( */}
            <MarketCard markets={markets} />
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
