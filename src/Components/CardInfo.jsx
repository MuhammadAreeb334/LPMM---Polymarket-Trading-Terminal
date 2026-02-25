import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const CardInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const market = location.state?.marketData;

  if (!market) {
    return (
      <div className="text-white p-10">
        Market data not found. Please go back.
      </div>
    );
  }
  const yesToken = market.tokens?.find((t) => t.outcome === "Yes") || {};
  const probValue = yesToken.price ? yesToken.price * 100 : 0;

  return (
    <div className="lg:col-span-8">
      <div className="bg-white dark:bg-primary-dark transition-colors border border-gray-200 dark:border-gray-700 rounded-md">
        <div className="h-[calc(95vh-62px)] overflow-y-auto px-4 py-2 custom-scrollbar [&::-webkit-scrollbar]:hidden">
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
                src={market?.icon}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-medium">{market?.question}</h1>
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                <Calendar size={14} />
                Ends: {new Date(market?.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-[#1B1E23] transition-colors p-4 rounded-xl text-start">
              <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">
                YES Price
              </p>
              <p className="text-green-500 text-lg font-medium">
                {probValue.toFixed(2)}¢
              </p>
              <p className="text-gray-600 text-sm">
                ${(probValue / 100).toFixed(4)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-[#1B1E23] transition-colors p-4 rounded-xl text-start">
              <p className="text-gray-500 text-sm mb-1 uppercase tracking-wider">
                NO Price
              </p>
              <p className="text-red-500 text-lg font-medium">
                {(100 - probValue).toFixed(2)}¢
              </p>
              <p className="text-gray-600 text-sm">
                ${((100 - probValue) / 100).toFixed(4)}
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
              {market?.description}
            </p>
          </div>

          <div className="flex gap-2 mt-4 pb-2">
            {market?.tags.map((tag) => (
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
  );
};

export default CardInfo;
