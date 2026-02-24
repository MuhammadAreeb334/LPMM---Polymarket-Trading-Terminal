import CardInfo from "../Components/CardInfo.jsx";
import PlaceOrder from "../Components/PlaceOrder.jsx";
import OrderBook from "../Components/OrderBook.jsx";

const MarketDetails = () => {
  return (
    <div className="">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <CardInfo />
        <PlaceOrder />
        <OrderBook />
      </div>
    </div>
  );
};

export default MarketDetails;
