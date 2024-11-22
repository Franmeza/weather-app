const currentDate = new Date();

export const localTime = new Intl.DateTimeFormat("default", {
  hour: "2-digit",
  minute: "2-digit",
}).format(currentDate);
