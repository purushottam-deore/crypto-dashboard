import { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import Searchbar from "./Searchbar";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  BarElement
);

function Chart({ coin, setCoin }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState(1);
  const [chartType, setChartType] = useState("line");

  const timeRanges = {
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "1Y": 365
  };

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);

    try {
      let url;

      if (days === 1) {
        
        url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=1`;
      } else if(days === 7){
        
        url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=7`;
      } else if(days === 30){
        
        url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=30`;
      } else if(days === 365){
        
        url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=365`;
      }

      const res = await axios.get(url, {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-c6aQMVS9uML3iCHEayrKtSLY",
        },
      });

      if (!res.data || !res.data.prices) {
        throw new Error("No price data found");
      }

      const labels = res.data.prices.map(([timestamp]) => {
        const date = new Date(timestamp);
        return days === 1
          ? `${date.getHours()}:00` // hourly for 1D
          : `${date.getMonth() + 1}/${date.getDate()}`;
      });

      const data = res.data.prices.map(([, price]) => price);

      setChartData({
        labels,
        datasets: [
          {
            label: `${coin.toUpperCase()} Price (${currency.toUpperCase()})`,
            data,
            borderColor: "rgb(59,130,246)",
            backgroundColor: "rgba(59,130,246,0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load chart data.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPrices();
  }, [coin, currency, days]);

  return (
    <div className="w-full h-full flex flex-col space-y-4 m-4 p-4 gap-1">
      {/* Controls */}
      <div className="flex flex-wrap flex-1 items-center gap-2">
        {Object.keys(timeRanges).map((range) => (
          <button
            key={range}
            onClick={() => setDays(timeRanges[range])}
            className={`px-3 py-1 rounded shadow ${
              days === timeRanges[range] ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {range}
          </button>
        ))}

        
        

        {/* Coin Selector */}
        <select
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          className="border rounded px-2 py-1 shadow bg-gray-200"
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="dogecoin">Dogecoin</option>
          <option value="solana">Solana</option>
          <option value="cardano">Cardano</option>
          <option value="ripple">XRP</option>
          <option value="polkadot">Polkadot</option>
          <option value="tron">TRON</option>
          <option value="litecoin">Litecoin</option>
          <option value="avalanche-2">Avalanche</option>
        </select>

        {/* Chart Type Selector */}
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border rounded px-5 py-1 shadow bg-gray-200"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[300px]">
        {loading && <p>Loading chart...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && chartData && (
          chartType === "line" ? (
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          ) : (
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          )
        )}
      </div>
    </div>
  );
}

export default Chart;
