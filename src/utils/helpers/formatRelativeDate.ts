import { formatRelative } from "date-fns";
import { ko } from "date-fns/esm/locale";

const locale = {
  ...ko,
};

const formatRelativeDate = (date: Date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = formatRelative(date, new Date(), { locale });
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

export default formatRelativeDate;
