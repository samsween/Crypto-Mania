import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

import { ToolTipContent } from "./ToolTip";

export const CryptoPieChart = ({ total, isLoading }) => {
  return (
    <PieChart width={400} height={400}>
      {!isLoading && (
        <Pie
          data={total}
          dataKey="totalValue"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={200}
          fill="rgb(249 115 22)"
          label
        />
      )}
      <Tooltip content={<ToolTipContent />} />
    </PieChart>
  );
};
