/**
 * transformDateForAPIRequest returns date in a string format which can be used for the API fetch call
 * @param {Date} date
 */

const transformDateForAPIRequest = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

export default transformDateForAPIRequest;
