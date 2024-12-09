import { format } from "date-fns";

export const timeFormatter = (
  time: Date | string = new Date(),
  timeFormat: string
) => {
  const formattedTime = format(new Date(time), timeFormat);

  return formattedTime;
};
