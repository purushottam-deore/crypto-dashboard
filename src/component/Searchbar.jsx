import React from "react";

const Searchbar = ({ value, onChange, onSelect }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSelect(value.toLowerCase());  // commit typed text as coin
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)} // just update text
      onKeyDown={handleKeyDown}                  // commit only on Enter
      placeholder="Search by coin"
      className="flex-1 shadow rounded-lg text-lg m-2 px-3 py-2 border focus:outline-none shadow"
    />
  );
};

export default Searchbar;
