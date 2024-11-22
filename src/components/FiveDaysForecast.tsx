import H2 from "./reusable/H2";

function FiveDaysForecast() {
  return (
    <section className="flex flex-col gap-4  border border-white ">
      <H2>5-day forecast</H2>
      <div className="border border-white h-[118px]"></div>
    </section>
  );
}

export default FiveDaysForecast;
