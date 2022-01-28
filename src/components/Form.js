import React from "react";

const Form = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  getCoinData,
}) => {
  return (
    <div className="date-container">
      <input
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="pp.kk.vvvv"
        value={startDate}
        className="date-input"
      />
      <label>to</label>
      <input
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="pp.kk.vvvv"
        value={endDate}
        className="date-input"
      />
      <button onClick={() => getCoinData()} className="main-button">
        ANALYZE
      </button>
    </div>
  );
};
export default Form;
