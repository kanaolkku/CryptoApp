import React from "react";
import { useState } from "react";
import {
  checkDownwardTrend,
  checkHighestTradingVolume,
  highestProfitInRange,
  fetchDataFromApi,
} from "../services/cryptoService";
import Form from "./Form";
import Notification from "./Notification";
import ProfitAnalyzer from "./ProfitAnalyzer";

const CryptoCalculator = () => {
  const [startDate, setStartDate] = useState("03.10.2021");
  const [endDate, setEndDate] = useState("13.11.2021");
  const [dates, setDates] = useState({ date1: "", date2: "" });
  const [profit, setProfit] = useState({
    endDate: "",
    endPrice: "",
    profit: "",
    startDate: "",
    startPrice: "",
  });
  const [tradingVolume, setTradingVolume] = useState("");
  const [longestDWTrend, setLongestDWTrend] = useState("");
  const [status, setStatus] = useState("awaiting user input");
  const [message, setMessage] = useState({ type: "", message: "" });

  const handleMessage = (message, type, time = 3000) => {
    setMessage({ message, type });
    setTimeout(() => {
      setMessage({ message: "", type: "" });
    }, time);
  };

  const getCoinData = async () => {
    const data = await fetchDataFromApi(startDate, endDate);

    if (data) {
      setDates({ date1: startDate, date2: endDate });
      setStatus("Results for:");
      const downWardTrend = checkDownwardTrend(data);
      const highestTradingVolume = checkHighestTradingVolume(data);
      const profitObj = highestProfitInRange(data);

      setLongestDWTrend(downWardTrend);
      setProfit(profitObj);
      setTradingVolume(
        `${highestTradingVolume.amount} € on ${highestTradingVolume.date}`
      );

      setStartDate("");
      setEndDate("");

      handleMessage("Analysis success", "success", 1000);
    } else {
      handleMessage("Please insert a valid date range", "error", 2000);
    }
  };

  return (
    <div>
      <h1>Bitcoin analyzer</h1>
      <div className="calculator">
        <Form
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          endDate={endDate}
          startDate={startDate}
          getCoinData={getCoinData}
        />
        <div className="calc-container">
          <Notification type={message.type} message={message.message} />
          <h3>Status: {status}</h3>
          <div className="result-dates-container">
            <span className="date-item">{dates.date1}</span>
            <span className="separator">&#8211;</span>
            <span className="date-item">{dates.date2}</span>
          </div>
          <p>Longest downward trend: {longestDWTrend}</p>
          <p>Highest trading volume: {tradingVolume}</p>
          <ProfitAnalyzer profitDetails={profit} />
        </div>
      </div>
    </div>
  );
};

export default CryptoCalculator;
