/**
 * @description
 * @author musi
 * @date 2019-12-04
 * @param {*} date1
 * @param {*} date2
 * @returns
 */

function differDates(date1, date2) {
  let res = (date1 - date2) / (1000 * 3600 * 24);
  return Math.abs(res);
}

export default differDates;
