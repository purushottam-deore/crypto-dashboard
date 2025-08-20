const CurrencySelector = ({ baseCurrency, setBaseCurrency }) => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <select
        value={baseCurrency}
        onChange={(e) => setBaseCurrency(e.target.value)}
        className="text-lg font-semibold   px-3 py-2 bg-white shadow-l focus:outline-none  transition"
      >
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
};
export default CurrencySelector;