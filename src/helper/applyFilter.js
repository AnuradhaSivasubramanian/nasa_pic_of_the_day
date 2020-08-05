import transformDateForAPIRequest from "./transformDateForAPIRequest";

const applyFilter = (filter) => {
  let d = new Date();
  switch (filter) {
    case "month":
      return new Date(`2020-${d.getMonth()}-01`);

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
