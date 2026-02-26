import CardInfo from "../Components/CardInfo.jsx";
import PlaceOrder from "../Components/PlaceOrder.jsx";
import OrderBook from "../Components/OrderBook.jsx";
import { useState } from "react";

const MarketDetails = () => {
  const [selectedPrice, setSelectedPrice] = useState("");
  const [activeSide, setActiveSide] = useState("Buy");

  return (
    <div className="">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CardInfo />
        <PlaceOrder
          selectedPrice={selectedPrice}
          activeSide={activeSide} 
          setActiveSide={setActiveSide}
        />
        <OrderBook
          setSelectedPrice={setSelectedPrice}
          setActiveSide={setActiveSide} 
          activeSide={activeSide}
        />
      </div>
    </div>
  );
};

export default MarketDetails;
