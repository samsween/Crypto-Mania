export const ToolTipContent = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="bg-primary-100 border border-gray-300 text-gray-200 flex flex-col text-lg p-4">
        <h1>{payload[0].name}</h1>
        <h2>${payload[0].value}</h2>
      </div>
    );
  }
  return null;
};
