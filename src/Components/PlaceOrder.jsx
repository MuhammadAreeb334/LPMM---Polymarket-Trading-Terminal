import { useState, useEffect } from "react";
import { FireAPI } from "../Hooks/useRequest";
import { useParams } from "react-router-dom";
// import { toast } from "react-hot-toast";

const PlaceOrder = ({ selectedPrice, activeSide, setActiveSide }) => {
  const { id } = useParams();
  const [orderType, setOrderType] = useState("Limit");
  const [outcome, setOutcome] = useState("YES");
  const [side, setSide] = useState("Buy");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [bestBid, setBestBid] = useState(0);
  const [bestAsk, setBestAsk] = useState(0);
  const [loading, setLoading] = useState(false);

  // Sync internal side when the parent state changes (from table click)
  useEffect(() => {
    setSide(activeSide);
  }, [activeSide]);

  // Sync internal price when table is clicked
  useEffect(() => {
    if (selectedPrice) {
      setPrice(selectedPrice);
    }
  }, [selectedPrice]);

  // When clicking Buy/Sell buttons manually
  const handleSideChange = (newSide) => {
    setSide(newSide);
    setActiveSide(newSide);
  };
  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const fetchOrderBook = async () => {
      try {
        if (!id) return;
        const response = await FireAPI(`api/v1/get-order-books/${id}`);
        if (response.success && response.data.length > 0 && isMounted) {
          const data = response.data[0];
          const bids = [...data.bids].sort((a, b) => b.price - a.price);
          const asks = [...data.asks].sort((a, b) => a.price - b.price);
          setBestBid(Number(bids[0]?.price) || 0);
          setBestAsk(Number(asks[0]?.price) || 0);
        }
      } catch (err) {
        console.error("Failed to fetch order book:", err);
      } finally {
        timeoutId = setTimeout(fetchOrderBook, 10000);
      }
    };

    fetchOrderBook();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [id]);

  const estimatedCost = parseFloat(price || "0") * parseFloat(quantity || "0");

  const handleSubmit = async () => {
    if (!isConnected) {
      // toast.error("Please connect your wallet!");
      return;
    }

    try {
      setLoading(true);
      const res = await FireAPI("api/v1/place-an-order", "POST", {
        hash: id,
        price: parseFloat(price || "0"),
        quantity: parseFloat(quantity || "0"),
        side: side.toUpperCase(),
        address: "user_wallet_address_here",
      });

      // toast.success(res.message || "Order placed successfully!");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.log("Something went wrong");
      // toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
                className={`flex-1 text-sm py-2 rounded-md border border-gray-200 dark:border-gray-700 ${
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
                className={`flex-1 text-sm py-2 rounded-md border border-gray-200 dark:border-gray-700 ${
                  outcome === opt
                    ? opt === "YES"
                      ? "bg-green-600 text-white"
                      : "bg-red-500 text-white"
                    : "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {opt === "YES"
                  ? `YES @ ${((Number(bestBid) || 0) * 100).toFixed(2)}¢`
                  : `NO @ ${((Number(bestAsk) || 0) * 100).toFixed(2)}¢`}
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
                onClick={() => handleSideChange(opt)}
                className={`flex-1 text-sm py-2 rounded-md border border-gray-200 dark:border-gray-700 ${
                  side === opt
                    ? opt === "Buy"
                      ? "bg-green-600 text-white"
                      : "bg-red-500 text-white"
                    : "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {orderType === "Limit" && (
          <div className="space-y-2 mb-3">
            <h3 className="text-xs font-semibold text-gray-500">
              Price (USDC)
            </h3>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={
                outcome === "YES"
                  ? bestBid.toFixed(4)
                  : (1 - bestAsk).toFixed(4)
              }
              className="outline-none w-full p-2 text-sm rounded-md text-gray-500 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="space-y-2 mb-3">
          <h3 className="text-xs font-semibold text-gray-500">
            Quantity (Shares)
          </h3>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="ex: 10"
            className="outline-none w-full p-2 text-sm rounded-md text-gray-500 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <hr className="text-gray-300 mb-3" />

        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Est. Cost</span>
          <p className="text-sm">${estimatedCost.toFixed(2)} USDC</p>
        </div>

        <div className="mt-3">
          <button
            onClick={handleSubmit}
            disabled={!price || !quantity || loading || !isConnected}
            className={`w-full text-sm py-2 rounded-md font-semibold ${
              side === "Buy"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading
              ? "Placing Order..."
              : !isConnected
                ? "Connect Wallet"
                : `${side} ${outcome} ${
                    orderType === "Market" ? "(Market)" : ""
                  }`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
