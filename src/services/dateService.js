const generateTimestampSeconds = (datestring) => {
  const date = new Date(datestring);
  const offset = date.getTimezoneOffset() * 60 * 1000;
  const dateWithoutOffset = date - offset;
  const dateInSeconds = dateWithoutOffset / 1000;
  return dateInSeconds;
};

const generateDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const localFormatDate = date.toLocaleDateString();
  return localFormatDate;
};

const formatDateToEu = (eudate) => {
  const eudates = eudate.split(".");
  const dates = [eudates[1], eudates[0], eudates[2]];
  const dateString = dates.join("-");
  return dateString;
};
export { generateTimestampSeconds, generateDateFromTimestamp, formatDateToEu };
