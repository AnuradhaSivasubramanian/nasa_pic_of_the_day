/**
 * applyFilter returns date until which the pictures are to be displayed based on the filter value
 * @param {string} filter
 * @returns Date
 */

const applyFilter = (filter) => {
  let d = new Date();
  switch (filter) {
    case "month":
      d.setTime(d.getTime() - 30 * 24 * 60 * 60 * 1000);
      let month = new Date(d);
      return month;

    case "week":
      d.setTime(d.getTime() - 7 * 24 * 60 * 60 * 1000);
      let week = new Date(d);
      return week;

    case "twoweeks":
      d.setTime(d.getTime() - 14 * 24 * 60 * 60 * 1000);
      let twoweeks = new Date(d);
      return twoweeks;

    default:
      break;
  }
};

export default applyFilter;
