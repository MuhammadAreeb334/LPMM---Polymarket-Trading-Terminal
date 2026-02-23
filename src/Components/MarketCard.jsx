import React from "react";
import { TrendingUp, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MarketCard = ({ markets }) => {
  const navigate = useNavigate();

  // const yesToken = market.tokens?.find((token) => token.outcome === "Yes");
  // const probability = yesToken?.price ?? 0;
  // const date = new Date(market.endDate).toLocaleDateString();

  console.log(markets, "fffffffffffffffffff");
  return (
    // <div
    //   onClick={() => navigate(`/market/${market.question_id}`)}
    //   className="group flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-[#FAFAFA] dark:hover:bg-[#111317] transition-colors cursor-pointer last:border-0"
    // >
    //   <div className="flex-1 space-y-3">
    //     <p className="text-sm leading-tight transition-colors">
    //       {market.question}
    //     </p>
    //     <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
    //       <span className="flex items-center gap-1 text-gray-400">
    //         <TrendingUp size={14} /> {(probability * 100).toFixed(2)}%
    //       </span>
    //       <span className="flex items-center gap-1 text-gray-400">
    //         <Clock size={14} /> {date}
    //       </span>
    //       <span className="flex items-center gap-1 text-gray-400">
    //         Min: ${market.minimum_order_size}
    //       </span>
    //     </div>
    //     <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-gray-500">
    //       {market.tags.map((tag) => (
    //         <span className="px-2 py-0.5 rounded bg-[#FAFAFA] dark:bg-[#21262d] text-[10px] font-medium border border-gray-200 dark:border-gray-700">
    //           {tag}
    //         </span>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="flex items-center justify-between mt-4 md:mt-0 md:ml-4">
    //     <span
    //       className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${
    //         market.active
    //           ? "bg-green-500/10 border-green-500/20 text-green-500"
    //           : "bg-red-500/10 border-red-500/20 text-red-500"
    //       }`}
    //     >
    //       {market.active ? "Active" : "Closed"}
    //     </span>
    //     <ChevronRight
    //       size={18}
    //       className="text-gray-600 ml-4 hidden md:block group-hover:text-gray-300 transition-colors"
    //     />
    //   </div>
    // </div>
    <>
      {markets.map((market) => {
        const yesToken = market.tokens?.find(
          (token) => token.outcome === "Yes",
        );
        const probability = yesToken?.price ?? 0;
        const date = new Date(market.endDate).toLocaleDateString();

        return (
          <div
            key={market.condition_id}
            onClick={() => navigate(`/market/${market.question_id}`)}
            className="group flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-[#FAFAFA] dark:hover:bg-[#111317] transition-colors cursor-pointer last:border-0"
          >
            <div className="flex-1 space-y-3">
              <p className="text-sm leading-tight transition-colors">
                {market.question}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                <span className="flex items-center gap-1 text-gray-400">
                  <TrendingUp size={14} /> {(probability * 100).toFixed(2)}%
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Clock size={14} /> {date}
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  Min: ${market.minimum_order_size}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-gray-500">
                {market.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-[#FAFAFA] dark:bg-[#21262d] text-[10px] font-medium border border-gray-200 dark:border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 md:mt-0 md:ml-4">
              <span
                className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${
                  market.active
                    ? "bg-green-500/10 border-green-500/20 text-green-500"
                    : "bg-red-500/10 border-red-500/20 text-red-500"
                }`}
              >
                {market.active ? "Active" : "Closed"}
              </span>
              <ChevronRight
                size={18}
                className="text-gray-600 ml-4 hidden md:block group-hover:text-gray-300 transition-colors"
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MarketCard;
