import { useEffect, useMemo, useState } from "react";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { FireAPI } from "../Hooks/useRequest.js";

const OrderBook = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState({ bids: [], asks: [] });
  const [loading, setLoading] = useState(true);
  const [marketMeta, setMarketMeta] = useState({
    minOrder: "",
    tickSize: "",
    negRisk: false,
  });

  useEffect(() => {
    let isMounted = true; // prevent updates after unmount
    let timeoutId;

    const fetchOrderBook = async () => {
      try {
        if (!id) return;
        setLoading(true);

        const response = await FireAPI(`api/v1/get-order-books/${id}`);
        if (response.success && response.data.length > 0 && isMounted) {
          const marketData = response.data[0];

          setMarketMeta({
            minOrder: marketData.min_order_size,
            tickSize: marketData.tick_size,
            negRisk: marketData.neg_risk,
          });

          setOrders({
            bids: [...marketData.bids].sort((a, b) => b.price - a.price),
            asks: [...marketData.asks].sort((a, b) => a.price - b.price),
          });
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        if (isMounted) setLoading(false);
        // Poll again after 3 seconds
        timeoutId = setTimeout(fetchOrderBook, 5000);
      }
    };

    fetchOrderBook();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [id]);

  // Helper to calculate cumulative depth for the visual bars
  const processOrders = (orderList) => {
    let totalVolume = 0;
    const items = orderList.slice(0, 10); // Limit to top 10 for UI
    const maxVolume = Math.max(...items.map((o) => parseFloat(o.size)), 1);

    return items.map((order) => ({
      ...order,
      // depth percentage based on size relative to max in view
      depthPercentage: (parseFloat(order.size) / maxVolume) * 100,
    }));
  };

  const processedBids = useMemo(
    () => processOrders(orders.bids),
    [orders.bids],
  );
  const processedAsks = useMemo(
    () => processOrders(orders.asks),
    [orders.asks],
  );

  // Calculate Spread and Mid
  const bestBid = orders.bids[0]?.price || 0;
  const bestAsk = orders.asks[0]?.price || 0;
  const spread = Math.abs(bestAsk - bestBid).toFixed(2);
  const mid = ((parseFloat(bestBid) + parseFloat(bestAsk)) / 2).toFixed(2);

  return (
    <div className="lg:col-span-8">
      <div className="bg-white dark:bg-primary-dark transition-colors border border-gray-200 dark:border-gray-700 rounded-md">
        <div className="h-[calc(95vh-200px)] overflow-y-auto px-4 py-2 custom-scrollbar [&::-webkit-scrollbar]:hidden">
          <div className="pb-2">
            <h1 className=" font-semibold text-sm">Order Book</h1>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                Spread:{" "}
                <strong className="text-black dark:text-white">
                  {spread}¢
                </strong>
              </span>
              <span className="text-xs text-gray-500">
                Mid:{" "}
                <strong className="text-black dark:text-white">{mid}¢</strong>
              </span>
            </div>
          </div>

          <hr className="text-gray-200 dark:text-gray-700" />

          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="bg-gray-50 dark:bg-[#1B1E23] transition-colors p-4 rounded-xl text-start">
              <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">
                Best Bid
              </p>
              <p className="text-green-500 text-lg font-medium">{bestBid}</p>
              <p className="text-gray-600 text-sm">Size: 130</p>
            </div>
            <div className="bg-gray-50 dark:bg-[#1B1E23] transition-colors p-4 rounded-xl text-start">
              <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">
                Best Ask
              </p>
              <p className="text-red-500 text-lg font-medium">{bestAsk}</p>
              <p className="text-gray-600 text-sm">Size: 1.1K</p>
            </div>
          </div>
          {/* */}
          <div className="p-2">
            <div className="grid grid-cols-2 gap-4">
              <table className="w-full text-[11px] border-separate border-spacing-y-1">
                <thead>
                  <tr className="text-gray-500 uppercase">
                    <th className="text-left font-normal pb-2">Bid</th>
                    <th className="text-right font-normal pb-2">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {processedBids.map((row, i) => (
                    <tr key={i} className="relative group">
                      <td className="text-green-500 font-medium py-1">
                        {row?.price}
                      </td>
                      <td className="text-right relative px-2 text-gray-500">
                        <span className="relative z-10">
                          {parseFloat(row?.size).toLocaleString()}
                        </span>
                        <div
                          className="absolute inset-y-0 right-0 bg-green-500/10 rounded-sm transition-all"
                          style={{ width: `${row?.depthPercentage}%` }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="w-full text-[11px] border-separate border-spacing-y-1">
                <thead>
                  <tr className="text-gray-500 uppercase">
                    <th className="text-left font-normal pb-2">Ask</th>
                    <th className="text-right font-normal pb-2">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {processedAsks.map((row, i) => (
                    <tr key={i} className="relative">
                      <td className="text-red-500 font-medium py-1">
                        {row?.price}
                      </td>
                      <td className="text-right relative px-2 text-gray-500">
                        <span className="relative z-10">
                          {parseFloat(row?.size).toLocaleString()}
                        </span>
                        <div
                          className="absolute inset-y-0 right-0 bg-red-500/10 rounded-sm transition-all"
                          style={{ width: `${row?.depthPercentage}%` }}
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
                <span className="text-gray-900 dark:text-gray-100">
                  {" "}
                  {marketMeta?.minOrder}
                </span>
              </div>
              <div className="text-center">
                Tick Size:{" "}
                <span className="text-gray-900 dark:text-gray-100">
                  {marketMeta?.tickSize}
                </span>
              </div>
              <div className="text-end">
                Neg Risk:{" "}
                <span className="text-gray-900 dark:text-gray-100">
                  {marketMeta?.negRisk ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
