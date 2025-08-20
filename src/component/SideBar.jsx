import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = ({ baseCurrency }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: baseCurrency.toLowerCase(),
              order: "market_cap_desc",
              per_page: 20,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
      } catch (err) {
        console.error("Error fetching coins:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [baseCurrency]);

  return (
    <div className="flex flex-col flex-1 bg-gray-50 p-4 rounded-2xl shadow">
      {/* Header */}
      <h2 className="text-xl font-bold mb-4">Top Cryptos</h2>

      {/* Content */}
      <div className="flex-1 ">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <ul className="space-y-2">
            {coins.map((coin) => (
              <li
                key={coin.id}
                className="bg-white px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                  <span className="font-medium">{coin.name}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Mkt Cap: {coin.market_cap.toLocaleString()}{" "}
                  {baseCurrency.toUpperCase()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
