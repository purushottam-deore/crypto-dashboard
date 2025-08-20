import React, { useState, useEffect } from "react";
import axios from "axios";

const ExchangeCoins = () => {
  const [sellCoin, setSellCoin] = useState("Bitcoin");
  const [buyCoin, setBuyCoin] = useState("Ethereum");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [prices, setPrices] = useState({});

  const coinMap = {
    bitcoin: "Bitcoin",
    ethereum: "Ethereum",
    tether: "Tether",
    solana: "Solana",
    ripple: "Ripple",
    cardano: "Cardano",
    dogecoin: "Dogecoin",
    polkadot: "Polkadot",
    litecoin: "Litecoin",
    tron: "Tron",
  };

  const coins = Object.keys(coinMap);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
            ","
          )}&vs_currencies=usd`
        );

        // Transform into { Bitcoin: priceInUSD, Ethereum: priceInUSD, ... }
        const newPrices = {};
        coins.forEach((coin) => {
          newPrices[coinMap[coin]] = data[coin].usd;
        });

        setPrices(newPrices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    }

    fetchPrices();
  }, []);

  const handleConvert = () => {
    if (
      amount &&
      prices[sellCoin] &&
      prices[buyCoin] &&
      sellCoin !== buyCoin
    ) {
      // convert sellCoin -> USD -> buyCoin
      const usdValue = amount * prices[sellCoin];
      const result = usdValue / prices[buyCoin];
      setConvertedAmount(`${result.toLocaleString()} ${buyCoin}`);
    } else {
      setConvertedAmount(`0 ${buyCoin}`);
    }
  };

  const coinOptions = Object.values(coinMap);

  return (
    <div className="bg-white rounded-2xl shadow w-full h-5px flex justify-between flex-col p-4 gap-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Exchange Coins</h2>
        <div className="text-right">
          <label className="text-gray-500 text-xs block ">Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Sell */}
      <div className="flex items-center justify-center mb-3">
        <span className="w-12 flex-1 text-orange-500 font-semibold">Sell</span>
        <select
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={sellCoin}
          onChange={(e) => setSellCoin(e.target.value)}
        >
          {coinOptions.map((coin) => (
            <option key={coin}>{coin}</option>
          ))}
        </select>
      </div>

      {/* Buy */}
      <div className="flex items-center justify-center">
        <span className="w-12 flex-1 text-green-600 font-semibold">Buy</span>
        <select
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
          value={buyCoin}
          onChange={(e) => setBuyCoin(e.target.value)}
        >
          {coinOptions.map((coin) => (
            <option key={coin}>{coin}</option>
          ))}
        </select>
      </div>

      {/* Result */}
      <div className="mt-2 text-center">
        <span className="text-xs text-gray-500 block">You will get</span>
        <span className="text-lg font-bold text-green-600">
          {convertedAmount || `0 ${buyCoin}`}
        </span>
      </div>

      {/* Button */}
      <button
        onClick={handleConvert}
        className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-base transition"
      >
        Exchange
      </button>
    </div>
  );
};

export default ExchangeCoins;
