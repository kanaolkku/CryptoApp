import {
  formatDateToEu,
  generateDateFromTimestamp,
  generateTimestampSeconds,
} from "./dateService";

const formDataObjects = (data, over90) => {
  const dataItemAmount = data.market_caps.length;
  // initialize empty array for the upcoming data objects
  const dataObjects = [];
  let pushAmount = 24;

  //bug detected if the range is less than 90 days and the date is before 06-01-2018

  for (let i = 0; i < dataItemAmount; over90 ? i++ : (i += pushAmount)) {
    let dataObj = {};
    dataObj.date = data.prices[i][0];
    dataObj.price = data.prices[i][1];
    dataObj.marketCap = data.market_caps[i][1];
    dataObj.totalVolume = data.total_volumes[i][1];

    dataObjects.push(dataObj);
  }
  return dataObjects;
};

const checkHighestTradingVolume = (dataArr) => {
  let highestAmount;
  let date;

  dataArr.forEach((dataItem) => {
    if (!highestAmount) {
      highestAmount = dataItem.totalVolume;
      date = dataItem.date;
    } else {
      if (highestAmount < dataItem.totalVolume) {
        highestAmount = dataItem.totalVolume;
        date = dataItem.date;
      }
    }
  });

  highestAmount = highestAmount.toFixed(2);
  date = generateDateFromTimestamp(date);

  return {
    amount: highestAmount,
    date,
  };
};

const checkDownwardTrend = (dataArr) => {
  let longestDownwardTrend = 0; //longestDownwardTrend
  let currentDownwardTrend = 0; //currentDownwardTrend
  let previousValue; //previousvalue
  // for loop
  dataArr.forEach((dataItem) => {
    //check if current value is bigger than the previous one. if it is, reset the currentdw trend. if it's not, add one to currentdwtrend. then check if currentdwtrend is larger than the longest one. if it is place the currentdwtrend as the longest
    if (!previousValue) {
      previousValue = dataItem.price;
    } else {
      if (dataItem.price > previousValue) {
        currentDownwardTrend = 0;
        previousValue = dataItem.price;
      } else {
        currentDownwardTrend++;

        if (currentDownwardTrend > longestDownwardTrend) {
          longestDownwardTrend = currentDownwardTrend;
        }

        previousValue = dataItem.price;
      }
    }
  });
  return longestDownwardTrend;
};

const fetchDataFromApi = (startDate, endDate) => {
  //format date strings into date objects
  const startDateFormatted = formatDateToEu(startDate);
  const endDateFormatted = formatDateToEu(endDate);

  // generate timestamps from dates
  const date1 = generateTimestampSeconds(startDateFormatted);
  let date2 = generateTimestampSeconds(endDateFormatted);
  // add an hour to the end date
  date2 += 3600;
  // check if date difference is over 90 days
  const dateTimeDifference = date2 - date1;
  let isOver90;

  if (dateTimeDifference >= 7776000 /* 90 days in milliseconds */) {
    isOver90 = true;
  } else if (dateTimeDifference < 7776000 && dateTimeDifference > 86400) {
    isOver90 = false;
  } else {
    return;
  }

  const data = fetch(
    `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${date1}&to=${date2}`
  )
    .then((data) => data.json())
    .then((data) => {
      //form objects from the data CoinGecko's api returns. isOver90 determines the way the data gets handled
      return formDataObjects(data, isOver90);
    })
    .catch((err) => console.log(err.message));

  return data;
};

const highestProfitInRange = (dataArr) => {
  //declare mutable profit object

  let highestProfit = {
    startDate: "",
    startPrice: "",
    endDate: "",
    endPrice: "",
    profit: 0,
  };

  //loop through each item in the array
  dataArr.forEach((dataItem, index) => {
    // set startPrice as the first price in the array
    const startPrice = dataItem.price;

    //compare current item to the following items in the array to measure the profit margins
    for (let i = index + 1; i < dataArr.length; i++) {
      const endItem = dataArr[i];
      let endPrice = endItem.price;
      // calculate profit margin
      let profit = endPrice - startPrice;

      // if the profit margin is higher than the current highest, update highestProfit
      if (profit > highestProfit.profit) {
        highestProfit.startDate = generateDateFromTimestamp(dataItem.date);
        highestProfit.endDate = generateDateFromTimestamp(endItem.date);
        highestProfit.startPrice = dataItem.price.toFixed(2);
        highestProfit.endPrice = endItem.price.toFixed(2);
        highestProfit.profit = profit.toFixed(2);
        // toFixed here to make the value more readable
      }
    }
  });

  //returns the highest profit and the details around it
  return highestProfit;
};

export {
  checkDownwardTrend,
  checkHighestTradingVolume,
  formDataObjects,
  fetchDataFromApi,
  highestProfitInRange,
};
