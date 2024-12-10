const unitTempConvert = (temp: number, unit: string) => {
  if (unit === "C") {
    return Math.round(temp - 273.15);
  } else {
    return Math.round(((temp - 273.15) * 9) / 5 + 32);
  }
};

export default unitTempConvert;
