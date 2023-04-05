import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ToolTipContent } from "./ToolTipContent";
import dayjs from "dayjs";

export const Graph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <Line
          dot={false}
          type="monotone"
          dataKey="price"
          stroke="rgb(249 115 22)"
        />
        <XAxis
          dataKey="date"
          tickFormatter={(val) => {
            return dayjs(val).format("h:mm");
          }}
        />
        <YAxis />
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          content={<ToolTipContent />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
