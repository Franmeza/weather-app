import { format } from "date-fns";

export const timeFormatter = (time = new Date()) => {
  const formattedTime = format(new Date(time), "h mm a");
  console.log(formattedTime);
  return formattedTime;
};
