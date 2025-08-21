import React, { useState } from "react";
import Chart from "../component/Chart";
import ExchangeCoins from "../component/ExchangeCoins";
import Sidebar from "../component/SideBar";
import Portfolio from "../component/Portfolio";
import Searchbar from "../component/Searchbar";
import CurrencySelector from "../component/CurrencySelector";


const Dashboard = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [coin, setCoin] = useState("bitcoin");
  const [searchText, setSearchText] = useState(""); 

  return (
    <div className="grid grid-cols-12 grid-rows-12 gap-2 h-screen m-4 p-4 bg-gray-200 rounded">

      {/* Header - Currency Selector */}
      <div className="bg-white rounded-lg shadow col-start-1 col-end-1 row-start-1 row-end-1 flex justify-center items-center">
        <CurrencySelector
          baseCurrency={baseCurrency}
          setBaseCurrency={setBaseCurrency}
        />
      </div>

      {/* Sidebar */}
      <div className="bg-white col-start-10 col-end-[-1] row-start-1 row-end-[-1] p-2 rounded shadow overflow-auto">
        <Sidebar baseCurrency={baseCurrency} />
      </div>

      {/* Searchbar */}
      <div className=" col-start-2 col-end-10 flex justify-center items-center">
        <Searchbar value={searchText} onChange={setSearchText} onSelect={setCoin} />

      </div>

      {/* Chart */}
      <div className="bg-white rounded shadow col-start-1 col-end-10 row-start-2 row-end-9 flex justify-center items-center">
        <Chart coin={coin} setCoin={setCoin}/>
        
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded shadow col-start-1 col-end-5 row-start-9 row-end-[-1] p-4">
        <Portfolio />
      </div>

      {/* Exchange Coins */}
      <div className="bg-white rounded shadow col-start-5 col-end-10 row-start-9 row-end-[-1] p-4 overflow-auto">
        <ExchangeCoins />
      </div>
    </div>
  );
};

export default Dashboard;
