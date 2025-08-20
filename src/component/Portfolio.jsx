import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
    // Sample portfolio data
    const portfolio = [
        {
            name: "Bitcoin",
            symbol: "BTC",
            amount: 1.25,
            price: 29000,
            color: "#F7931A",
        },
        {
            name: "Ethereum",
            symbol: "ETH",
            amount: 10,
            price: 1800,
            color: "#3C3C3D",
        },
        {
            name: "Solana",
            symbol: "SOL",
            amount: 50,
            price: 25,
            color: "#00FFA3",
        },
    ];

    // Calculate total portfolio value
    const totalValue = portfolio.reduce(
        (sum, coin) => sum + coin.amount * coin.price,
        0
    );

    // Chart data config
    const chartData = {
        labels: portfolio.map((coin) => coin.name),
        datasets: [
            {
                data: portfolio.map((coin) => coin.amount * coin.price),
                backgroundColor: portfolio.map((coin) => coin.color),
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#4B5563", // Tailwind's gray-700
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white p-2 rounded-2xl shadow w-full h-full flex justify-center item-center">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full">

                {/* Left: Title & Total Value */}
                <div className="space-y-2 md:w-1/2 ">
                    <h2 className="text-lg font-semibold text-blue-600">
                        My Crypto Portfolio
                    </h2>
                    <div className="text-gray-700 font-medium">
                        Total Value:{" "}
                        <span className="text-green-600 font-semibold">
                            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                {/* Right: Doughnut Chart */}
                <div className="flex justify-center items-center mt-2 md:mt-0 md:w-1/2 h-full">
                    <div className="w-full h-full max-w-[250px] max-h-[250px]">
                        <Doughnut data={chartData} options={chartOptions} />
                    </div>
                </div>

            </div>
        </div>


    );
};

export default Portfolio;
