import React from "react";
import ProfitBanner from "./ProfitBanner";

const ProfitAnalyzer = ({ profitDetails }) => {
  if (profitDetails.profit !== "") {
    if (profitDetails.profit > 0) {
      return (
        <div className="profit-analysis">
          <h3>Profit analysis</h3>
          <ProfitBanner profitAmount={profitDetails.profit} type={"profit"} />
          <p>
            Buy date: {profitDetails.startDate} | Buy price:{" "}
            {profitDetails.startPrice} €
          </p>
          <p>
            Sell date: {profitDetails.endDate} | Sell price:{" "}
            {profitDetails.endPrice} €
          </p>
        </div>
      );
    } else {
      return (
        <div className="profit-analysis">
          <h3>Profit analysis</h3>
          <ProfitBanner />
          <p>Travelling to this point in time is not advised!</p>
        </div>
      );
    }
  } else {
    return (
      <div className="profit-analysis">
        <h3>Profit analysis</h3>
        <p>The profit analysis will be displayed here</p>
      </div>
    );
  }
};

export default ProfitAnalyzer;
