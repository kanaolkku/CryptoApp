import React from "react";

const ProfitBanner = ({ profitAmount, type }) => {
  if (type === "profit") {

    return (
      <div className="profit-banner">
        <span className="dolla-dolla">$</span>
        <div>
          <p>Profit Detected!</p>
          <p className="banner-result">{profitAmount} €</p>
          <p>per coin</p>
        </div>
        <span className="dolla-dolla">$</span>
      </div>
    )
  } else {
    return (
      <div>
        <div className="profit-banner loss">
          <p>No Profit Detected!</p>
          <p></p>
        </div>
      </div>
    )
  }
}

export default ProfitBanner