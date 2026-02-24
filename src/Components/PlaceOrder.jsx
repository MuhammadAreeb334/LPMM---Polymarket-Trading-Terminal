import { useState } from "react";

const PlaceOrder = () => {
  const [orderType, setOrderType] = useState("Limit");
  const [outcome, setOutcome] = useState("YES");
  const [side, setSide] = useState("Buy");
  return (
    <div className="lg:col-span-4">
      <div className="bg-white dark:bg-primary-dark transition-colors border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2">
        <h3 className="font-semibold mb-4">Place Orders</h3>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500">Order Type</h3>
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
          <h3 className="text-xs font-semibold text-gray-500">Price (USDC)</h3>
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
  );
};

export default PlaceOrder;
