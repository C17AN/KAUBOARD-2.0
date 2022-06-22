import formatDate from "./formatDate";

export enum Day {
  "MONDAY" = 1,
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
}

const getNextWeekDay = (day: Day) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + ((7 - d.getUTCDay()) % 7) + day);
  const date = d.toDateString();
  return formatDate(new Date(date));
};

export default getNextWeekDay;
