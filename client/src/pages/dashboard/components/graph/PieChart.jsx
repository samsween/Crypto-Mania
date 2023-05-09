import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

import { ToolTipContent } from "./ToolTip";

export const CryptoPieChart = ({ total, isLoading }) => {
  return (
    <ResponsiveContainer width={300} height={300}>
    <PieChart width={"100%"} he>
      {!isLoading && (
        <Pie
          data={total}
          dataKey="totalValue"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="rgb(249 115 22)"
          label
        />
      )}
      <Tooltip content={<ToolTipContent />} />
    </PieChart>
    </ResponsiveContainer>
  );
};
