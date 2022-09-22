/** @format */

// format date

import moment from "moment";
import "moment/locale/id";

export const formatDate = (date) => {
  return moment(date).format("DD MMMM YYYY");
};
