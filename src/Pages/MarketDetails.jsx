import React, { useState } from "react";
import { ArrowLeft, RefreshCw, Info, Calendar, Wallet } from "lucide-react";
import Logo from "../assets/Logo.png";
import { useParams, useNavigate } from "react-router-dom";
import MarketData from "../assets/MarketData.js";

const MarketDetails = () => {
  const data = [
    { price: "0.37", size: "1.1K", depth: 9 },
    { price: "0.34", size: "148", depth: 1 },
    { price: "0.33", size: "2.7K", depth: 23 },
    { price: "0.32", size: "1.0K", depth: 8 },
    { price: "0.28", size: "25", depth: 0 },
    { price: "0.27", size: "300", depth: 3 },
    { price: "0.25", size: "200", depth: 2 },
    { price: "0.24", size: "77", depth: 1 },
    { price: "0.23", size: "367", depth: 3 },
    { price: "0.22", size: "900", depth: 8 },
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState("Limit");
  const [outcome, setOutcome] = useState("YES");
  const [side, setSide] = useState("Buy");

  const market = MarketData.find((m) => m.id === parseInt(id));

  if (!market) {
    return <div className="text-white p-10">Market not found.</div>;
  }

  return (
    <div className="">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-primary-dark transition-colors border border-gray-200 dark:border-gray-700 rounded-md">
            <div className="h-[calc(95vh-100px)] overflow-y-auto px-4 py-2 custom-scrollbar">
              <div className="flex justify-between items-center pb-2">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:hover:text-white transition cursor-pointer"
                >
                  <ArrowLeft size={16} /> Back to Markets
                </button>
                <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded border border-green-500/20">
                  ACTIVE
                </span>
              </div>

              <hr className="text-gray-200 dark:text-gray-700" />

              <div className="flex gap-2 md:gap-4 py-4">
                <div className="w-14 h-14">
                  <img
                    src={Logo}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-medium">{market.question}</h1>
                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                    <Calendar size={14} />
                    Ends: {market.date}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-[#1B1E23] transition-colors p-4 rounded-xl text-start">
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">
                    YES Price
                  </p>
                  <p className="text-green-500 text-lg font-medium">
                    {market.probability.toFixed(2)}¢
                  </p>
                  <p className="text-gray-600 text-sm">
                    ${(market.probability / 100).toFixed(4)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-[#1B1E23] transition-colors p-4 rounded-xl text-start">
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">
                    NO Price
                  </p>
                  <p className="text-red-500 text-lg font-medium">
                    {(100 - market.probability).toFixed(2)}¢
                  </p>
                  <p className="text-gray-600 text-sm">
                    ${((100 - market.probability) / 100).toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-xs sm:text-sm pb-3">
                <div>
                  <p className="text-gray-500 mb-1 uppercase">Spread</p>
                  <p>0.00%</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 uppercase">Min Order</p>
                  <p>$5</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 uppercase">Tick Size</p>
                  <p>0.01</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1 uppercase">Status</p>
                  <p>Accepting Orders</p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="font-semibold">Description</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  This is a market about the variation of consumer prices in
                  Brazil over the 12-month period ending December 2026, as
                  reported by the Brazilian Institute of Geography and
                  Statistics (IBGE). This market will resolve according to the
                  percentage change in the Extended National Consumer Price
                  Index (IPCA) during the 12-month period ending December 2026
                  according to the monthly IBGE report. The resolution source
                  for this market will be the IBGE Extended National Consumer
                  Price Index monthly report released for December 2026,
                  currently scheduled to be released on January 12, 2027.
                  Resolution of this market will take place upon release of the
                  aforementioned data. If no data for the specified month is
                  released by the date the next month's data is scheduled to be
                  released, this market will resolve based on data from the last
                  available month. You can find the relevant figure by locating
                  the report for December 2026 on the Press Releases page
                  locating the Period-Rate table and finding the IPCA growth
                  rate figure in the column labeled "Rate" and the Row labeled
                  “Cumulative in the year / 12 Months”. Changes in the IBGE's
                  reporting format will not disqualify a published relevant
                  figure from counting. Note: the resolution source for this
                  market will be the official monthly IBGE IPCA news release
                  which reports inflation during 12-month periods to two decimal
                  points (e.g. 4.26%). Thus, this is the level of precision that
                  will be used when resolving the market. For the full release
                  schedule,
                </p>
              </div>

              <div className="flex gap-2 mt-4 pb-2">
                {market.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-50 dark:bg-[#1B1E23] px-2 py-1 rounded text-[10px] border border-gray-200 dark:border-gray-700 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-primary-dark transition-colors border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2">
            <h3 className="font-semibold mb-4">Place Orders</h3>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500">
                Order Type
              </h3>
              <div className="flex gap-2 mb-3">
                {["Limit", "Market"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 text-sm py-2 rounded-md transition-colors border border-gray-200 dark:border-gray-700 ${
                      orderType === type
                        ? "bg-blue-600 text-white"
                        : "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500">Outcome</h3>
              <div className="flex gap-2 mb-3">
                {["YES", "NO"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setOutcome(opt)}
                    className={`flex-1 text-sm py-2 rounded-md transition-colors border border-gray-200 dark:border-gray-700 ${
                      outcome === opt
                        ? opt === "YES"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                        : "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {opt === "YES" ? "YES @ 0.90¢" : "NO @ 96.40¢"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500">Side</h3>
              <div className="flex gap-2 mb-3">
                {["Buy", "Sell"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSide(opt)}
                    className={`flex-1 text-sm py-2 rounded-md transition-colors border border-gray-200 dark:border-gray-700 ${
                      side === opt
                        ? opt === "Buy"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                        : "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <h3 className="text-xs font-semibold text-gray-500">
                Price (USDC)
              </h3>
              <input
                type="number"
                placeholder="0.0090"
                className="w-full p-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2 mb-3">
              <h3 className="text-xs font-semibold text-gray-500">
                Quantity (Shares)
              </h3>
              <input
                type="number"
                placeholder="ex: 10"
                className="w-full p-2 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <hr className="text-gray-300 mb-3" />

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Est. Cost</span>
              <p className="text-sm">$0.00 USDC</p>
            </div>
            <div className="mt-3">
              <button
                disabled={true}
                className="w-full text-sm py-2 rounded-md font-semibold bg-green-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Collect Wallet
              </button>
            </div>
          </div>
        </div>
        {/* */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-primary-dark transition-colors border border-gray-200 dark:border-gray-700 rounded-md">
            <div className="h-[calc(95vh-200px)] overflow-y-auto px-4 py-2 custom-scrollbar">
              <div className="pb-2">
                <h1 className=" font-semibold text-sm">Order Book</h1>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    Spread:{" "}
                    <strong className="text-black dark:text-white">
                      3.00¢
                    </strong>
                  </span>
                  <span className="text-xs text-gray-500">
                    Mid:{" "}
                    <strong className="text-black dark:text-white">
                      61.50¢
                    </strong>
                  </span>
                </div>
              </div>

              <hr className="text-gray-200 dark:text-gray-700" />

              <div className="grid grid-cols-2 gap-4 my-4">
                <div className="bg-gray-50 dark:bg-[#1B1E23] transition-colors p-4 rounded-xl text-start">
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">
                    Best Bid
                  </p>
                  <p className="text-green-500 text-lg font-medium">
                    {market.probability.toFixed(2)}¢
                  </p>
                  <p className="text-gray-600 text-sm">Size: 130</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#1B1E23] transition-colors p-4 rounded-xl text-start">
                  <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">
                    Best Ask
                  </p>
                  <p className="text-red-500 text-lg font-medium">
                    {(100 - market.probability).toFixed(2)}¢
                  </p>
                  <p className="text-gray-600 text-sm">Size: 1.1K</p>
                </div>
              </div>
              {/* */}
              <div className="p-2">
                <div className="grid grid-cols-2 gap-4">
                  <table className="w-full text-[11px] border-separate border-spacing-y-1">
                    <thead>
                      <tr className="text-gray-500 uppercase tracking-tighter">
                        <th className="text-left font-normal pb-2">Bid</th>
                        <th className="text-right font-normal pb-2">Size</th>
                        <th className="text-right font-normal pb-2 px-2">
                          Depth
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, i) => (
                        <tr key={i} className="relative group">
                          <td className="text-green-500 font-medium py-1">
                            {row.price}
                          </td>
                          <td className="text-right text-gray-500">
                            {row.size}
                          </td>
                          <td className="text-right relative px-2">
                            <span className="relative z-10 text-gray-500">
                              {row.depth}%
                            </span>
                            <div
                              className="absolute inset-y-0 right-0 bg-green-500/10 rounded-sm"
                              style={{ width: `${row.depth}%` }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <table className="w-full text-[11px] border-separate border-spacing-y-1">
                    <thead>
                      <tr className="text-gray-500 uppercase tracking-tighter">
                        <th className="text-left font-normal pb-2">Ask</th>
                        <th className="text-right font-normal pb-2">Size</th>
                        <th className="text-right font-normal pb-2 px-2">
                          Depth
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, i) => (
                        <tr key={i} className="relative">
                          <td className="text-red-500 font-medium py-1">
                            {row.price}
                          </td>
                          <td className="text-right text-gray-500">
                            {row.size}
                          </td>
                          <td className="text-right relative px-2">
                            <span className="relative z-10 text-gray-500">
                              {row.depth}%
                            </span>
                            <div
                              className="absolute inset-y-0 right-0 bg-red-500/10 rounded-sm"
                              style={{ width: `${row.depth}%` }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* */}
                <div className="grid grid-cols-3 p-3 bg-gray-50/30 dark:bg-[#1B1E23]/30 border-t border-gray-200 dark:border-gray-700 text-[11px] uppercase font-bold text-gray-500">
                  <div className="text-start">
                    Min Order:{" "}
                    <span className="text-gray-900 dark:text-gray-100"> 5</span>
                  </div>
                  <div className="text-center">
                    Tick Size:{" "}
                    <span className="text-gray-900 dark:text-gray-100">
                      0.01
                    </span>
                  </div>
                  <div className="text-end">
                    Neg Risk:{" "}
                    <span className="text-gray-900 dark:text-gray-100">No</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetails;
