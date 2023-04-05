import dayjs from "dayjs";

export const ToolTipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary-100 border border-gray-400  text-gray-300 text-sm p-2 rounded">
        <p className="label">{`${dayjs(label).format("hh:mm")} : $${parseFloat(
          payload[0].value
        ).toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};
