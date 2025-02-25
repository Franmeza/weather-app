import { useSensorData } from "@/hooks/useSensorsData";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function TemperatureGraph() {
  const sensorData = useSensorData();
  const chartData = sensorData?.data.slice(-158).map((item) => ({
    formatedDate: format(new Date(item.createdAt), "MMM dd"),
    createdAt: item.createdAt,
    temp: item.temperature,
    humidity: item.humidity,
  }));
  return (
    <LineChart width={510} height={300} data={chartData}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="formatedDate" stroke="#ffff" minTickGap={15} />
      <YAxis
        tickCount={6}
        domain={[
          (dataMin: number) => dataMin - 5,
          (dataMax: number) => dataMax + 5,
        ]}
        stroke="#ffff"
        tickFormatter={(value) => `${value}°`}
      />
      <Line
        type="monotone"
        dataKey="temp"
        stroke="#2563eb"
        strokeWidth={2}
        dot={false}
      />
      <Tooltip
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            return (
              <div className="rounded-lg flex flex-col bg-[#030616]  p-2 shadow-sm">
                <div>
                  <span>Temperature: </span>
                  <span className="font-bold">{payload[0].payload.temp}°</span>
                </div>
                <div>
                  <span>Humidity: </span>
                  <span className="font-bold">
                    {payload[0].payload.humidity}%
                  </span>
                </div>
                <div>
                  <span>Date: </span>
                  <span className="font-bold">
                    {format(
                      new Date(payload[0].payload.createdAt),
                      "yyyy-MM-dd h:mm aa"
                    )}
                  </span>
                </div>
              </div>
            );
          }
        }}
      />
    </LineChart>
  );
}

export default TemperatureGraph;
